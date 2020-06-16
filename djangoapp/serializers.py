from rest_framework.fields import empty
from django.contrib.auth import get_user_model
from rest_framework.serializers import ModelSerializer

from djangoapp.entities import UserEntity
from djangoapp.models import UserProfile, Game

User = get_user_model()


class GameSerializer(ModelSerializer):
    class Meta:
        model = Game
        fields = "__all__"


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('coins',)


class UserSerializer(ModelSerializer):

    def __init__(self, instance=None, data=empty, **kwargs):
        fields = kwargs.pop('fields', None)

        super().__init__(instance, data, **kwargs)

        if fields is not None:
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)

    user_profile = UserProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'user_profile')

    def create(self, validated_data):
        return UserEntity.register_user(validated_data)
