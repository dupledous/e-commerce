from django.contrib import admin
from .models import Usuario

# Register your models here.
admin.site.register(Usuario)

class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('id', 'username', 'email', 'is_active', 'is_staff')
    search_fields = ('username', 'email')
    list_filter = ('is_active', 'is_staff')
