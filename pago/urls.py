from .views import ProcesarPagoView
from django.urls import path

app_name = 'pago'

urlpatterns = [
    path('procesar/', ProcesarPagoView.as_view(), name='procesar_pago'),
]