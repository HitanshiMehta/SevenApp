import reversion
from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    class Meta:
        """
            Meta information about user table
        """
        db_table = "auth_user"


class UserProfile(models.Model):
    user_id = models.OneToOneField(User,
                                   db_column='user_id',
                                   on_delete=models.CASCADE,
                                   related_name='user_profile')
    coins = models.IntegerField(db_column="coins", default=500)

    class Meta:
        """
            for Meta information about user profile table
        """
        db_table = "user_profile"


@reversion.register()
class Game(models.Model):
    game_id = models.AutoField(primary_key=True, db_column="game_id")
    user_id = models.ForeignKey(User,
                                db_column="user_id",
                                on_delete=models.CASCADE,
                                related_name="played_game")
    user_choice = models.CharField(db_column="user_choice",max_length=20)
    betting_price = models.IntegerField(db_column="betting_price")
    dice_one = models.IntegerField(db_column="dice_one")
    dice_two = models.IntegerField(db_column="dice_two")
    dice_result = models.IntegerField(db_column="dice_result")
    result = models.CharField(db_column="result",max_length=10)
    is_coin = models.BooleanField(db_column="is_coin", default=True)

    class Meta:
        """
            for Meta information about game table
        """
        db_table = "game"
