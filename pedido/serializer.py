from rest_framework import serializers
from .models import Pedido, PedidoItem
from producto.serializer import ProductoDetailSerializer

class PedidoItemSerializer(serializers.ModelSerializer):
    producto = ProductoDetailSerializer(read_only=True)
    class Meta:
        model = PedidoItem
        fields = ['id', 'producto', 'cantidad', 'subtotal']

class PedidoSerializer(serializers.ModelSerializer):
    items = PedidoItemSerializer(many=True, read_only=True)
    class Meta:
        model = Pedido
        fields = ['id', 'usuario', 'fecha', 'estado', 'total', 'items']