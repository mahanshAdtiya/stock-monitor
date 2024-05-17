from django.contrib.auth.models import User
from django.db import models


class Note(models.Model):
    stockName = models.CharField(max_length=100)
    stockSymbol = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="stock")

    def __str__(self):
        return self.stockSymbol
