from django.db import models

class Account(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.username

class Alias(models.Model):
    alias = models.CharField(max_length=255)
    query = models.CharField(max_length=255)
    shortDescription = models.CharField(max_length=255)

    def __str__(self):
        return self.alias