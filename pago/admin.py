from django.contrib import admin
from .models import Pago

# Register your models here.
admin.site.register(Pago)

class PagoAdmin(admin.ModelAdmin):
    list_display = ('id', 'pedido', 'monto', 'fecha_pago', 'metodo_pago', 'estado')
    search_fields = ('pedido__id', 'metodo_pago', 'estado')
    list_filter = ('metodo_pago', 'estado', 'fecha_pago')
