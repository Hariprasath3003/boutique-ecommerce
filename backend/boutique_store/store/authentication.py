"""
API Authentication Configuration
Token-based authentication is used for all protected endpoints.
"""

from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

class CustomTokenAuth(TokenAuthentication):
    """Custom token authentication that matches frontend Token header"""
    keyword = 'Token'
    
    def authenticate_credentials(self, key):
        try:
            from django.contrib.auth.models import User
            from rest_framework.authtoken.models import Token
            token = Token.objects.select_related('user').get(key=key)
        except Token.DoesNotExist:
            raise AuthenticationFailed('Invalid token.')
        
        if not token.user.is_active:
            raise AuthenticationFailed('User inactive or deleted.')
        
        return (token.user, token)
