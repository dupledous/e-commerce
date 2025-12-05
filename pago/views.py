from .models import Pago
from .serializer import PagoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from pedido.models import Pedido

# Create your views here.
class ProcesarPagoView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        pedido = request.data.get('pedido')
        metodo = request.data.get('metodo_pago')

        #buscar el pedido y procesar el pago (lógica simulada)
        try:
            pedido_instance = Pedido.objects.get(id=pedido, usuario=request.user)
        except Pedido.DoesNotExist:
            return Response({'error': 'Pedido no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
        
        #evitar pagos duplicados
        if pedido.estado == 'pagado':
            return Response({'error': 'El pedido ya ha sido pagado.'}, status=status.HTTP_400_BAD_REQUEST)
        
        #crear el registro de pago
        pago = Pago.objects.create(
            pedido = pedido,
            monto = pedido.total,
            metodo_pago = metodo,
            aprobado = True
        )

        #actualizar el estado del pedido
        pedido.estado = 'pagado'
        pedido.save()

        return Response({'mensaje': 'Pago procesado con éxito.', 'pago_id': pago.id}, status=status.HTTP_200_OK)