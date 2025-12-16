from rest_framework import serializers
from .models import Pedido, PedidoItem
from producto.serializer import ProductoDetailSerializer

class PedidoItemSerializer(serializers.ModelSerializer):
    producto = ProductoDetailSerializer(read_only=True)
    
    class Meta:
        model = PedidoItem
        # Agregamos 'precio' para saber a cuánto se vendió en ese momento
        fields = ['id', 'producto', 'cantidad', 'precio', 'subtotal']

class PedidoSerializer(serializers.ModelSerializer):
    items = PedidoItemSerializer(many=True, read_only=True)
    # Si quieres mostrar el nombre del usuario en lugar del ID
    usuario_nombre = serializers.ReadOnlyField(source='usuario.username')

    class Meta:
        model = Pedido
        # Agregamos subtotal e iva al detalle del pedido
        fields = [
            'id', 'usuario', 'usuario_nombre', 'fecha', 
            'direccion', 'ciudad', 'comuna',
            'subtotal', 'iva', 'total', 'items'
        ]