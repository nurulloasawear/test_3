from django.db import models

class Order(models.Model):
    order_number = models.CharField(max_length=100, unique=True, verbose_name="Buyurtma raqami")
    order_date = models.DateTimeField(auto_now_add=True, verbose_name="Sana")
    # Boshqa kerakli maydonlarni qo'shishingiz mumkin

    def __str__(self):
        return self.order_number

class Customer(models.Model):
    name = models.CharField(max_length=255, verbose_name="Ismi")
    email = models.EmailField(verbose_name="Email")
    # Boshqa kerakli maydonlarni qo'shishingiz mumkin

    def __str__(self):
        return self.name