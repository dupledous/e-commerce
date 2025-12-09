from .models import CarritoItem
from .serializer import CarritoItemSerializer
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from producto.models import Producto
from django.core.exceptions import ValidationError


class CarritoItemListView(generics.ListAPIView):
    serializer_class = CarritoItemSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CarritoItem.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        producto_id = self.request.data.get("producto_id")

        if not producto_id:
            raise ValidationError({"error": "producto_id es obligatorio"})

        try:
            producto = Producto.objects.get(id=producto_id)
        except Producto.DoesNotExist:
            raise ValidationError({"error": "Producto no encontrado"})

        serializer.save(usuario=self.request.user, producto=producto)


# agregar al carrito

class AgregarAlCarritoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        producto_id = request.data.get("producto_id")
        cantidad = int(request.data.get("cantidad", 1))

        try:
            producto = Producto.objects.get(id=producto_id)
        except Producto.DoesNotExist:
            return Response({"error": "Producto no encontrado"}, status=404)

        item, created = CarritoItem.objects.get_or_create(
            usuario=request.user,
            producto=producto,
            defaults={'cantidad': cantidad}
        )

        if not created:
            item.cantidad += cantidad
            item.save()

        return Response({"message": "Producto agregado al carrito exitosamente"})

# actualizar cantidad 
class ActualizarCantidadView(generics.UpdateAPIView):
    queryset = CarritoItem.objects.all()
    serializer_class = CarritoItemSerializer
    permission_classes = [permissions.IsAuthenticated]

#eliminar item del carrito
class EliminarItemCarritoView(generics.DestroyAPIView):
    queryset = CarritoItem.objects.all()
    serializer_class = CarritoItemSerializer

