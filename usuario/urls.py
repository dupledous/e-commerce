from django.urls import path
from .views import RegisterUsuarioView, LoginUsuarioView

app_name = 'usuario'
urlpatterns = [
    path('registrar/', RegisterUsuarioView.as_view(), name='registrar_usuario'),
    path('login/', LoginUsuarioView.as_view(), name='login_usuario'),
]
