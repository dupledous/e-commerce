from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from .serializer import PedidoSerializer

from .models import Pedido, PedidoItem
from carrito.models import CarritoItem

# Create your views here.
class CrearPedidoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        usuario = request.user
        carrito_items = CarritoItem.objects.filter(usuario=usuario)

        if carrito_items.count() == 0:
            return Response({"error": "El carrito está vacío"}, status=400)

        pedido = Pedido.objects.create(usuario=usuario)
        total = 0

        for item in carrito_items:
            subtotal = item.producto.precio * item.cantidad
            PedidoItem.objects.create(
                pedido=pedido,
                producto=item.producto,
                cantidad=item.cantidad,
                subtotal=subtotal
            )
            total += subtotal
        pedido.total = total
        pedido.save()

        carrito_items.delete()

        return Response({"message": "Pedido creado exitosamente", "pedido_id": pedido.id})
    
class MisPedidosView(generics.ListAPIView):
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Pedido.objects.filter(usuario=self.request.user).order_by('-fecha')