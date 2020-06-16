import traceback

import reversion
import logging

from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
from rest_framework import status
from rest_framework.response import Response

from djangoapp.constant import VALID, USER, VALIDATION_FAIL, NOT_FOUND, USER_FK, UPDATED, USER_PROFILE
from djangoapp.entities import UserProfileEntity
from djangoapp.serializers import UserProfileSerializer


class UserProfileService:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

    def update_coins(self, request):
        try:
            user_profile = UserProfileEntity.objects.get(user_id=request.GET.get(USER_FK))
            serializer = UserProfileSerializer(instance=user_profile, data=request.data, partial=True)
            if serializer.is_valid():
                try:
                    with transaction.atomic(), reversion.create_revision():
                        self.logger.info(VALID.format(USER_PROFILE))
                        serializer.save()
                        self.logger.info(UPDATED.format(USER_PROFILE))
                        return Response(data=serializer.data, status=status.HTTP_200_OK)
                except Exception as exc:
                    full_traceback = traceback.format_exc()
                    self.logger.error(full_traceback)
                    return Response(exc, status=status.HTTP_400_BAD_REQUEST)
            self.logger.error(VALIDATION_FAIL.format(USER_PROFILE, serializer.errors))
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response(NOT_FOUND.format(USER), status=status.HTTP_404_NOT_FOUND)
