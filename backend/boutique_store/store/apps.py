from django.apps import AppConfig
from django.db.models.signals import post_migrate


class StoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'store'

    def ready(self):
        # Create admin user on every startup (safer for deployment)
        create_admin_user(None)


def create_admin_user(sender, **kwargs):
    from django.contrib.auth.models import User
    from .models import UserRole
    import sys

    try:
        # Create admin user if it doesn't exist
        if not User.objects.filter(username='admin').exists():
            admin_user = User.objects.create_superuser(
                username='admin',
                email='admin@boutique.com',
                password='admin123',
                first_name='Admin',
                last_name='User'
            )

            # Create admin role
            UserRole.objects.create(user=admin_user, role='admin')
            print("Admin user created: username='admin', password='admin123'", file=sys.stderr)
        else:
            print("Admin user already exists", file=sys.stderr)
    except Exception as e:
        print(f"Error creating admin user: {e}", file=sys.stderr)
