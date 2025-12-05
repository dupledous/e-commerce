from .views import ProductoListView, ProductoDetailView
from django.urls import path

app_name = 'producto'

urlpatterns = [
    path('', ProductoListView.as_view(), name='producto_list'),
    path('<int:pk>/', ProductoDetailView.as_view(), name='producto_detail'),
]