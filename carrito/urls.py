from.views import CarritoItemListView, AggregarAlCarritoView, ActualizarCantidadView, EliminarItemCarritoView
from django.urls import path

app_name = 'carrito'

urlpatterns = [
    path('', CarritoItemListView.as_view(), name='carrito_item_list'),
    path('agregar/', AggregarAlCarritoView.as_view(), name='agregar_al_carrito'),
    path('actualizar/<int:pk>/', ActualizarCantidadView.as_view(), name='actualizar_cantidad'),
    path('eliminar/<int:pk>/', EliminarItemCarritoView.as_view(), name='eliminar_item_carrito'),
]