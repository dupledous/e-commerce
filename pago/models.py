from django.db import models
from pedido.models import Pedido

# Create your models here.
class Pago(models.Model):
    pedido = models.OneToOneField(Pedido, on_delete=models.CASCADE, related_name='pago')
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_pago = models.DateTimeField(auto_now_add=True)
    metodo_pago = models.CharField(max_length=50)
    aprobado = models.BooleanField(default=False)

    def __str__(self):
        return f'Pago {self.id} - Pedido {self.pedido.id} - Monto {self.monto}'