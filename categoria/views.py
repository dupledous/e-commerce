from django.shortcuts import render
from .models import Categoria
from .serializer import CategoriaSerializer
from rest_framework import generics
from producto.models import Producto
from producto.serializer import ProductoSerializer

# Create your views here.
class CategoriaListView(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class CategoriaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer



class ProductoPorCategoriaView(generics.ListAPIView):
    serializer_class = ProductoSerializer

    def get_queryset(self):
        categoria_id = self.kwargs["categoria_id"]
        return Producto.objects.filter(categoria_id=categoria_id)
