import logging

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from djangoapp.constant import REQUEST_INFO, GET, GAME, POST, POST_ERROR
from djangoapp.service.game_service import GameService


class GameView(APIView):

    def __init__(self):
        super().__init__()
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

    def get(self, request):
        self.logger.info(REQUEST_INFO.format(GET, GAME, request.GET))
        response = GameService().get_game(request)
        return response

    def post(self, request):
        """
           Purpose: new entry of played game
           :param request: game data
           :type request: Request Object
           :return: Status of game post.(stored or not)
       """
        if request.data:
            self.logger.info(REQUEST_INFO.format(POST, GAME, request.data))
            response = GameService().post_game(request)
            return response
        else:
            self.logger.error(POST_ERROR.format(GAME))
            return Response(data=POST_ERROR.format(GAME), status=status.HTTP_400_BAD_REQUEST)
