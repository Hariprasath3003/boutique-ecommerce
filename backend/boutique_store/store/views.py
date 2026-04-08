from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.db.models import Q
from .models import UserRole, Product, Cart, CartItem, Order, OrderItem
from .serializers import (
    UserSerializer, UserRegistrationSerializer, ProductSerializer,
    CartSerializer, CartItemSerializer, OrderSerializer, OrderItemSerializer
)


def get_user_role(user):
    try:
        return user.role.role
    except AttributeError:
        return 'admin' if (user.is_staff or user.is_superuser) else 'user'


class AuthViewSet(viewsets.ViewSet):
    """Authentication endpoints"""
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['post'])
    def register(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                'message': 'User registered successfully',
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({'error': 'Please provide username and password'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.get(username=username)
            if user.check_password(password):
                token, _ = Token.objects.get_or_create(user=user)
                return Response({
                    'message': 'Login successful',
                    'token': token.key,
                    'user': UserSerializer(user).data
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request):
        request.user.auth_token.delete()
        return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def check_auth(self, request):
        """Check authentication status"""
        user = request.user
        if user.is_authenticated:
            user_role = get_user_role(user)
            return Response({
                'authenticated': True,
                'user': user.username,
                'role': user_role,
                'is_staff': user.is_staff,
                'is_superuser': user.is_superuser,
                'token_valid': True
            })
        return Response({
            'authenticated': False,
            'token_valid': False,
            'error': 'No valid authentication token provided'
        }, status=status.HTTP_401_UNAUTHORIZED)


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        user_role = get_user_role(user)
        
        if user_role == 'admin':
            return Product.objects.filter(created_by=user)
        else:
            return Product.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    
    @action(detail=False, methods=['get'])
    def all_products(self, request):
        """Get all products (for users)"""
        products = Product.objects.all()
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def user_products(self, request):
        """Get products added by current admin user"""
        user = request.user
        user_role = get_user_role(user)
        
        if user_role != 'admin':
            return Response({'error': 'Only admins can view this'}, status=status.HTTP_403_FORBIDDEN)
        
        products = Product.objects.filter(created_by=user)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)


class CartViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def get_cart(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def add_item(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        size = request.data.get('size', 'M')
        
        if not product_id:
            return Response({'error': 'Product ID required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            size=size,
            defaults={'quantity': quantity}
        )
        
        if not created:
            cart_item.quantity += int(quantity)
            cart_item.save()
        
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def remove_item(self, request):
        item_id = request.data.get('item_id')
        
        try:
            item = CartItem.objects.get(id=item_id)
            if item.cart.user != request.user:
                return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
            item.delete()
        except CartItem.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
        
        cart = Cart.objects.get(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def update_item(self, request):
        item_id = request.data.get('item_id')
        quantity = request.data.get('quantity')
        size = request.data.get('size')
        
        try:
            item = CartItem.objects.get(id=item_id)
            if item.cart.user != request.user:
                return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)
            
            if quantity:
                item.quantity = int(quantity)
            if size:
                item.size = size
            item.save()
        except CartItem.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)
        
        cart = Cart.objects.get(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def clear_cart(self, request):
        try:
            cart = Cart.objects.get(user=request.user)
            cart.items.all().delete()
        except Cart.DoesNotExist:
            pass
        
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)


class OrderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        user = self.request.user
        user_role = get_user_role(user)
        
        if user_role == 'admin':
            return Order.objects.all()
        else:
            return Order.objects.filter(user=user)
    
    @action(detail=False, methods=['post'])
    def create_order(self, request):
        user = request.user
        
        try:
            cart = Cart.objects.get(user=user)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)
        
        if not cart.items.exists():
            return Response({'error': 'Cart is empty'}, status=status.HTTP_400_BAD_REQUEST)
        
        total_price = cart.get_total_price()
        order = Order.objects.create(user=user, total_price=total_price)
        
        for cart_item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.product.price,
                size=cart_item.size
            )
        
        cart.items.all().delete()
        
        serializer = OrderSerializer(order)
        return Response({
            'message': 'Order created successfully',
            'order': serializer.data
        }, status=status.HTTP_201_CREATED)
    
    @action(detail=False, methods=['get'])
    def admin_orders(self, request):
        """Get all orders (admin only)"""
        user = request.user
        user_role = get_user_role(user)
        
        if user_role != 'admin':
            return Response({'error': 'Only admins can view all orders'}, status=status.HTTP_403_FORBIDDEN)
        
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['patch'])
    def update_status(self, request, pk=None):
        """Update order status (admin only)"""
        user = request.user
        user_role = get_user_role(user)
        
        if user_role != 'admin':
            return Response({'error': 'Only admins can update orders'}, status=status.HTTP_403_FORBIDDEN)
        
        try:
            order = Order.objects.get(id=pk)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)
        
        status_val = request.data.get('status')
        if status_val:
            order.status = status_val
            order.save()
        
        serializer = OrderSerializer(order)
        return Response(serializer.data)
