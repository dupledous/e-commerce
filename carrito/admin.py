from django.contrib import admin
from .models import CarritoItem

# Register your models here.
admin.site.register(CarritoItem)

class CarritoAdmin(admin.ModelAdmin):
    list_display = ('id', 'usuario', 'fecha_creacion', 'total_items')
    search_fields = ('usuario__username',)
    list_filter = ('fecha_creacion',)
