
from rest_framework import viewsets
from main.models import Customer
from .serializers import CustomerSerializer
from main.api.permissions import IsAuthenticatedUser

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticatedUser]