from django.contrib import admin
from django.urls import path

from djangoapp.views.game_view import GameView
from djangoapp.views.user_profile_view import UserProfileView
from djangoapp.views.user_view import UserView

urlpatterns = [
    path('user', UserView.as_view(), name='user'),
    path('game', GameView.as_view(), name='game'),
    path('user_profile', UserProfileView.as_view(), name='user_profile'),
]
