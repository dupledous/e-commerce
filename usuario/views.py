from rest_framework import generics
from rest_framework.response import Response
from .serializer import UsuarioSerializer, LoginSerializer
from .models import Usuario


class RegisterUsuarioView(generics.CreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class LoginUsuarioView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Aquí ya vienen: access, refresh, username, id
        data = serializer.validated_data

        return Response({
            "message": "Login correcto",
            **data   # 🔥 devuelve access, refresh, username, id
        })
