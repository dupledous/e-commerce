from django.contrib import admin
from .models import Pedido

# Register your models here.
admin.site.register(Pedido)

class PedidoAdmin(admin.ModelAdmin):
    list_display = '__all__',
    search_fields = ('usuario__username', 'estado')
    list_filter = ('estado', 'fecha_creacion')
