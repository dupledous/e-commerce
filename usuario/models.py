from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Usuario(AbstractUser):
    telefono = models.CharField(max_length=20, blank=True)
    direccion = models.CharField(max_length=255, blank=True)
    role = models.CharField(
    max_length=20,
    choices=[("cliente", "Cliente"), ("admin", "Administrador")],
    default="cliente"
)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='usuario_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions',
        verbose_name='groups',
        related_query_name='usuario',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='usuario_set',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='usuario',
        verbose_name='user permissions',
    )
    def __str__(self):
        return self.username