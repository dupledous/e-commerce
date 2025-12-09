from django.urls import path
from .views import (
    CarritoItemListView,
    AgregarAlCarritoView,
    ActualizarCantidadView,
    EliminarItemCarritoView
)

urlpatterns = [
    path('', CarritoItemListView.as_view(), name='carrito_list'),
    path('agregar/', AgregarAlCarritoView.as_view(), name='carrito_agregar'),
    path('actualizar/<int:pk>/', ActualizarCantidadView.as_view(), name='carrito_actualizar'),
    path('eliminar/<int:pk>/', EliminarItemCarritoView.as_view(), name='carrito_eliminar'),
]
