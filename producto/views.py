from django.shortcuts import render
from .models import Producto
from .serializer import ProductoSerializer
from rest_framework import generics

# Create your views here.
class ProductoListView(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
