from .views import CrearPedidoView, MisPedidosView,DetallePedidoView
from django.urls import path

app_name = 'pedido'


urlpatterns = [
    path('crear/', CrearPedidoView.as_view(), name='crear_pedido'),
    path('mis-pedidos/', MisPedidosView.as_view(), name='mis_pedidos'),
    path('detalle/<int:id>/', DetallePedidoView.as_view(), name='detalle_pedido'),
]
