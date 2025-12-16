from django.shortcuts import render
from .models import Producto
from .serializer import ProductoSerializer
from rest_framework import generics
from .permissions import IsAdminUser

# Create your views here.
class ProductoListView(generics.ListCreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class ProductoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer


class ProductoCreateView(generics.CreateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAdminUser]


class ProductoUpdateView(generics.UpdateAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [IsAdminUser]

class ProductoDeleteView(generics.DestroyAPIView):
    queryset = Producto.objects.all()
    permission_classes = [IsAdminUser]
