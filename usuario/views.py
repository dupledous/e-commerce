from rest_framework import generics
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .serializer import UsuarioSerializer, LoginSerializer
from .models import Usuario

class RegisterUsuarioView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class LoginUsuarioView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        usuario = authenticate(username=username, password=password)

        if usuario is not None:
            refresh = RefreshToken.for_user(usuario)
            return Response({
                "message": "Login correcto",
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            })

        return Response({"error": "Credenciales incorrectas"}, status=400)
