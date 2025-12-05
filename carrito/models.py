from django.db import models
from producto.models import Producto
from usuario.models import Usuario

# Create your models here.
class CarritoItem(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='carrito_items')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField(default=1)

    def subtotal(self):
        return self.producto.precio * self.cantidad

    def __str__(self):
        return f"{self.producto.nombre} X {self.usuario.username}"