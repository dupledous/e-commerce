from rest_framework import serializers
from .models import Usuario
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'password', 'telefono', 'direccion']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        usuario = Usuario(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            telefono=validated_data.get('telefono', ''),
            direccion=validated_data.get('direccion', '')
        )
        usuario.set_password(validated_data['password'])
        usuario.save()
        return usuario


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        usuario = authenticate(username=username, password=password)

        if usuario is None:
            raise serializers.ValidationError("Credenciales incorrectas")

        refresh = RefreshToken.for_user(usuario)

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": usuario.username,
            "id": usuario.id
        }

