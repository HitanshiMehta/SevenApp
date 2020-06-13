from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    coins = models.IntegerField(db_column="coins")

    class Meta:
        """
            for Meta information about user table
        """

        db_table = "auth_user"