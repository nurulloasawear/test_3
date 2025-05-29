
from rest_framework import viewsets
from main.models import Order
from .serializers import OrderSerializer
from main.api.permissions import IsAuthenticatedUser

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticatedUser]