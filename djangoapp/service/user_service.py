import traceback
import reversion
import logging
import json

from django.contrib.auth.models import User
from django.db import transaction
from rest_framework import status
from rest_framework.response import Response

from djangoapp.constant import VALID, USER, VALIDATION_FAIL, CREATED, USERNAME, PASSWORD, USERNAME_PASSWORD, \
    GET_SUCCESSFULLY, NOT_FOUND
from djangoapp.entities import UserEntity
from djangoapp.serializers import UserSerializer


class UserService:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

    def find_user(self, request):
        if request.GET.get(USERNAME) and request.GET.get(PASSWORD):
            user = UserEntity.objects.filter(
                username=request.GET[USERNAME],
                password=request.GET[PASSWORD]
            )
            serializer = UserSerializer(user, many=True)
            if not serializer:
                self.logger.info(NOT_FOUND.format(USER))
                return Response(NOT_FOUND.format(USER), status=status.HTTP_400_BAD_REQUEST)
            self.logger.info(GET_SUCCESSFULLY.format(USER))
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            self.logger.info(USERNAME_PASSWORD)
            return Response(USERNAME_PASSWORD, status=status.HTTP_400_BAD_REQUEST)

    def register_user(self, request):
        """
            :param request: user register data
            :return: status of request. (register or not)
        """
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic(), reversion.create_revision():
                    self.logger.info(VALID.format(USER))
                    print()
                    UserEntity.objects.create(
                        username=serializer.validated_data['username'],
                        email=serializer.validated_data['email'],
                        password=serializer.validated_data['password'],
                    )
                    self.logger.info(CREATED.format(USER))
                    return Response(data=serializer.validated_data, status=status.HTTP_201_CREATED)
            except Exception as ex:
                full_traceback = traceback.format_exc()
                self.logger.info(full_traceback)
                return Response(ex, status=status.HTTP_400_BAD_REQUEST)
        else:
            self.logger.error(VALIDATION_FAIL.format(USER, serializer.errors))
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
