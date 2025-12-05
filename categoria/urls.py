from .views import CategoriaListView, CategoriaDetailView, ProductoPorCategoriaView
from django.urls import path

app_name = 'categoria'

urlpatterns = [
    path('', CategoriaListView.as_view(), name='categoria_list'),
    path('<int:pk>/', CategoriaDetailView.as_view(), name='categoria_detail'),
    path('<int:categoria_id>/productos/', ProductoPorCategoriaView.as_view(), name='productos_por_categoria'),
]