from .models import Producto
from rest_framework import serializers

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class ProductoDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'