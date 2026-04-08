from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from store.models import UserRole


class Command(BaseCommand):
    help = 'Create admin user if it does not exist'

    def handle(self, *args, **options):
        try:
            # Check if admin user exists
            admin_user = User.objects.filter(username='admin').first()
            if not admin_user:
                admin_user = User.objects.create_superuser(
                    username='admin',
                    email='admin@boutique.com',
                    password='admin123',
                    first_name='Admin',
                    last_name='User'
                )
                self.stdout.write(self.style.SUCCESS('Admin user created: username="admin", password="admin123"'))

            # Ensure admin role exists
            role, created = UserRole.objects.get_or_create(
                user=admin_user,
                defaults={'role': 'admin'}
            )
            if created:
                self.stdout.write(self.style.SUCCESS('Admin role created for user'))
            else:
                role.role = 'admin'
                role.save()
                self.stdout.write(self.style.SUCCESS('Admin role updated for user'))

            self.stdout.write(self.style.SUCCESS(f'Admin user ready: {admin_user.username}, superuser: {admin_user.is_superuser}, staff: {admin_user.is_staff}'))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error creating admin user: {e}'))
            import traceback
            traceback.print_exc()