from .views import ProductoListView, ProductoDetailView,ProductoCreateView,ProductoDeleteView,ProductoUpdateView
from django.urls import path

app_name = 'producto'

urlpatterns = [
    path('', ProductoListView.as_view(), name='producto_list'),
    path('<int:pk>/', ProductoDetailView.as_view(), name='producto_detail'),
    path('crear/', ProductoCreateView.as_view(), name = "crearProducto"),
    path('editar/<int:pk>/', ProductoUpdateView.as_view(), name = "editarProducto"),
    path('eliminar/<int:pk>/', ProductoDeleteView.as_view(), name = "eliminarProducto"),
]
