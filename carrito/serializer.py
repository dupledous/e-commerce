from rest_framework import serializers
from .models import CarritoItem
from producto.serializer import ProductoDetailSerializer


class CarritoItemSerializer(serializers.ModelSerializer):
    producto = ProductoDetailSerializer(read_only=True)

    class Meta:
        model = CarritoItem
        fields = ['id', 'producto', 'cantidad']
