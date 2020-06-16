import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from djangoapp.constant import POST_ERROR, USER_FK, PATCH, USER_PROFILE, \
    REQUEST_INFO_PATCH, PATCH_ERROR
from djangoapp.service.user_profile_service import UserProfileService


class UserProfileView(APIView):

    def __init__(self):
        super().__init__()
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

    def patch(self, request):
        """
            Purpose: To increase/decrease coins of user
            :param request: user id and coins
            :type request: Request Object
            :return: Status of update.
        """
        if request.data and request.GET.get(USER_FK):
            self.logger.info(
                REQUEST_INFO_PATCH.format(PATCH, USER_PROFILE, request.data, USER_FK, request.GET.get(USER_FK)))
            return UserProfileService().update_coins(request)
        else:
            self.logger.error(PATCH_ERROR.format(USER_PROFILE))
            return Response(data=PATCH_ERROR.format(USER_PROFILE), status=status.HTTP_400_BAD_REQUEST)
