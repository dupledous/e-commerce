from rest_framework import serializers
from .models import Usuario

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
    password = serializers.CharField()
