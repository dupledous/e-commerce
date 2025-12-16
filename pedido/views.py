from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions
from .serializer import PedidoSerializer
from rest_framework.permissions import IsAuthenticated
from decimal import Decimal
from .models import Pedido, PedidoItem
from carrito.models import CarritoItem

# Create your views here.

class CrearPedidoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print("data recibida", request.data)
        usuario = request.user

        direccion = request.data.get("direccion", "").strip()
        ciudad = request.data.get("ciudad", "").strip()
        comuna = request.data.get("comuna", "").strip()

        if not direccion:
            return Response({"error": "La dirección es obligatoria"}, status=400)
        
        if not ciudad :
            return Response({"error": "La ciudad es obligatoria"}, status=400)
        
        if not comuna:
            return Response({"error": "La comuna es obligatoria"}, status=400)

        items = CarritoItem.objects.filter(usuario=usuario)
        if not items.exists():
            return Response({"error": "Carrito vacío"}, status=400)

        subtotal = sum(item.producto.precio * item.cantidad for item in items)
        iva = subtotal * Decimal("0.19")
        total = subtotal + iva

        pedido = Pedido.objects.create(
            usuario=usuario,
            direccion=direccion,
            ciudad = ciudad,
            comuna = comuna,
            subtotal=subtotal,
            iva=iva,
            total=total
        )
        for item in items:
            # Calculamos el subtotal de esta línea específica
            subtotal_linea = item.producto.precio * item.cantidad

            PedidoItem.objects.create(
                pedido=pedido,
                producto=item.producto,
                cantidad=item.cantidad,
                precio=item.producto.precio,  # Ahora el modelo ya tiene este campo
                subtotal=subtotal_linea       # Esto soluciona el error "NOT NULL constraint failed"
            )

            # 🔽 DESCONTAR STOCK
            item.producto.stock -= item.cantidad
            item.producto.save()

        items.delete()

        return Response({
            "message": "Pedido creado",
            "pedido_id": pedido.id
        })





    
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
