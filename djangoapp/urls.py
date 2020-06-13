from django.contrib import admin
from django.urls import path

from djangoapp.views.user_view import UserView

urlpatterns = [
    path('user', UserView.as_view(), name='user'),
]
