from django.contrib import admin
from .models import Categoria

# Register your models here.
admin.site.register(Categoria)

class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'descripcion')
    search_fields = ('nombre',)
