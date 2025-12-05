from django.contrib import admin
from .models import Producto

# Register your models here.
admin.site.register(Producto)

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'precio', 'stock', 'imagen', 'categoria')
    search_fields = ('nombre', 'descripcion')
    list_filter = ('categoria',)