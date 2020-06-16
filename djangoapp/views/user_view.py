import logging
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


from djangoapp.constant import USER, REQUEST_INFO, GET, POST, POST_ERROR
from djangoapp.service.user_service import UserService


class UserView(APIView):

    def __init__(self):
        super().__init__()
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

    def get(self, request):
        self.logger.info(REQUEST_INFO.format(GET, USER, request.GET))
        response=UserService().authenticate_user(request)
        return response

    def post(self, request):
        """
            Purpose: To register new user to system
            :param request: user data(username,user_mobile_no,user_password)
            :type request: Request Object
            :return: Status of request.(register or not)
        """
        if request.data:
            self.logger.info(REQUEST_INFO.format(POST, USER, request.data))
            return UserService().register_user(request)
        else:
            self.logger.error(POST_ERROR.format(USER))
            return Response(data=POST_ERROR.format(USER),status=status.HTTP_400_BAD_REQUEST)
