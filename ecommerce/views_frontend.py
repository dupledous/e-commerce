from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def productos(request):
    return render(request, 'productos.html')

def producto(request, id):
    return render(request, 'producto.html', {"id": id})

def carrito(request):
    return render(request, 'carrito.html')

def pedido(request):
    return render(request, 'pedido.html')

def login(request):
    return render(request, 'login.html')

def registro(request):
    return render(request, 'registrar.html')


def mis_pedidos(request):
    return render(request, 'mis_pedidos.html')

def pagar(request, id):
    return render(request, 'pagar.html', {"id": id})

def categorias(request):
    return render(request, "categorias.html")

def productos_por_categoria(request, id):
    return render(request, "productos_por_categoria.html", {"id": id})



