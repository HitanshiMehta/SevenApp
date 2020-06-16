import traceback

import reversion
import logging

from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from djangoapp.constant import VALID, USER, VALIDATION_FAIL, CREATED, USERNAME, PASSWORD, USERNAME_PASSWORD, \
    GET_SUCCESSFULLY, NOT_FOUND
from djangoapp.entities import UserEntity
from djangoapp.serializers import UserSerializer


class UserService:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

    def authenticate_user(self, request):
        # Find user by username and password in login
        if request.GET.get(USERNAME) and request.GET.get(PASSWORD):
            user_entity = UserEntity.authenticate_user(request)
            # If user is not found show not found error
            if not user_entity:
                self.logger.info(NOT_FOUND.format(USER))
                return Response(NOT_FOUND.format(USER), status=status.HTTP_400_BAD_REQUEST)
            user = UserSerializer(user_entity, fields=['id', 'username', 'user_profile'])
            self.logger.info(GET_SUCCESSFULLY.format(USER))
            return Response(data=user.data, status=status.HTTP_200_OK)
        # If user don't provide username and password query parameter show error message
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
                    # password validation- must contain 8 characters.
                    try:
                        validate_password(serializer.validated_data[PASSWORD])
                    except ValidationError as e:
                        self.logger.info(e)
                        return Response(e, status=status.HTTP_400_BAD_REQUEST)
                    self.logger.info(VALID.format(USER))
                    serializer.save()
                    self.logger.info(CREATED.format(USER))
                    return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            except Exception as ex:
                full_traceback = traceback.format_exc()
                self.logger.info(full_traceback)
                return Response(ex, status=status.HTTP_400_BAD_REQUEST)
        else:
            self.logger.error(VALIDATION_FAIL.format(USER, serializer.errors))
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
