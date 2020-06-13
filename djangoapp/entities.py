from django.contrib.auth import get_user_model

User = get_user_model()
from djangoapp.manager import UserManager


class UserEntity(User):
    """
    User entity
    """

    objects = UserManager()

    class Meta:
        """
            Purpose: proxy->True to override the main functionality of existing user
        """
        proxy = True
