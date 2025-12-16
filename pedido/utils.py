from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

def enviar_recibo_por_email(pedido):
    asunto = f"Recibo de compra - Pedido #{pedido.id}"
    destinatario = [pedido.usuario.email]

    html = render_to_string("emails/recibo.html", {
        "pedido": pedido,
        "items": pedido.items.all()
    })

    email = EmailMultiAlternatives(
        subject=asunto,
        body="Gracias por tu compra",
        to=destinatario
    )
    email.attach_alternative(html, "text/html")
    email.send()
