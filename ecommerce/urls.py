from django.urls import path, include
from .views_frontend import index, productos, producto, carrito, pedido, login, registro, mis_pedidos, pagar,categorias, productos_por_categoria
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('productos/', productos, name='productos'),
    path('producto/<int:id>/', producto, name='producto'),
    path('carrito/', carrito, name='carrito'),
    path('pedido/', pedido, name='pedido'),
    path('login/', login, name='login'),
    path('registro/', registro, name='registrar'),
    path('mis_pedidos/', mis_pedidos, name='mis_pedidos'),
    path('pagar/<int:id>/', pagar, name='pagar'),
    path('categorias/', categorias, name='categorias'),
    path('productos_por_categoria/<int:id>/', productos_por_categoria, name='productos_por_categoria'),



    # APIs
    path('api/usuario/', include('usuario.urls')),
    path('api/producto/', include('producto.urls')),
    path('api/categorias/', include('categoria.urls')),
    path('api/carrito/', include('carrito.urls')),
    path('api/pedido/', include('pedido.urls')),
    path('api/pago/', include('pago.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)