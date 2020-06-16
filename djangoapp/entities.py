from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from djangoapp.constant import USERNAME, PASSWORD
from djangoapp.manager import UserManager, UserProfileManager, GameManager
from djangoapp.models import User, UserProfile, Game


class UserEntity(User):
    """
    User entity
    """
    objects = UserManager()

    @staticmethod
    def authenticate_user(request):
        user = authenticate(username=request.GET[USERNAME], password=request.GET[PASSWORD])
        return user

    @staticmethod
    def register_user(validated_data):
        # Encrypt password
        validated_data[PASSWORD] = make_password(validated_data[PASSWORD])
        user = UserEntity.objects.create(**validated_data)
        UserProfileEntity.objects.create(user_id=user)
        return user

    class Meta:
        """
            Purpose: proxy->True to override the main functionality of existing user
        """
        proxy = True


class UserProfileEntity(UserProfile):
    """
        User profile entity
    """
    objects = UserProfileManager()

    class Meta:
        """
            Purpose: proxy->True to override the main functionality of existing user profile
        """
        proxy = True


class GameEntity(Game):
    """
        Game entity
    """
    objects = GameManager()

    class Meta:
        """
            Purpose: proxy->True to override the main functionality of existing game
        """
        proxy = True
