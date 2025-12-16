from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Permite solo a usuarios con role="admin" agregar productos
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == "admin"
