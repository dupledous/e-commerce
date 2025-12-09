from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from .serializer import PedidoSerializer
from rest_framework.permissions import IsAuthenticated

from .models import Pedido, PedidoItem
from carrito.models import CarritoItem

# Create your views here.
class CrearPedidoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        usuario = request.user

        items = CarritoItem.objects.filter(usuario=usuario)
        if not items.exists():
            return Response({"error": "Carrito vacío"}, status=400)

        pedido = Pedido.objects.create(usuario=usuario, total=0)

        total = 0
        for item in items:
            total += item.producto.precio * item.cantidad

        pedido.total = total
        pedido.save()

        items.delete()

        return Response({"message": "Pedido creado", "pedido_id": pedido.id})

    
class MisPedidosView(generics.ListAPIView):
    serializer_class = PedidoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Pedido.objects.filter(usuario=self.request.user).order_by('-fecha')
    
class DetallePedidoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        try:
            pedido = Pedido.objects.get(id=id, usuario=request.user)
        except Pedido.DoesNotExist:
            return Response({"error": "Pedido no encontrado"}, status=404)

        return Response({
            "id": pedido.id,
            "total": pedido.total,
            "fecha": pedido.fecha
        })
