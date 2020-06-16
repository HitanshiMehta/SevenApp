import logging
import traceback
import reversion

from django.db import transaction
from rest_framework import status
from rest_framework.response import Response

from djangoapp.constant import VALID, GAME, CREATED, VALIDATION_FAIL, REVERSION_CREATED, USER_ID, NOT_FOUND, \
    GET_SUCCESSFULLY, USER_ID_ERROR, GET_LUCK, WIN, LOSE
from djangoapp.entities import GameEntity
from djangoapp.methods import submit_reversion
from djangoapp.serializers import GameSerializer


class GameService:
    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.logger.setLevel(logging.INFO)

    def get_game(self, request):
        # To get luck of user in game
        if request.GET.get(USER_ID) and GET_LUCK in request.GET:
            game = GameEntity.objects.filter(user_id=request.GET[USER_ID]).count()
            win = GameEntity.objects.filter(user_id=request.GET[USER_ID], result=WIN).count()
            lose = GameEntity.objects.filter(user_id=request.GET[USER_ID], result=LOSE).count()
            result = {WIN: (win / game) * 100, LOSE: (lose / game) * 100}
            return Response(result, status=status.HTTP_200_OK)
        # To get history of all played game of user
        elif request.GET.get(USER_ID):
            game = GameEntity.objects.filter(user_id=request.GET[USER_ID])
            if not game:
                self.logger.info(NOT_FOUND.format(GAME))
                return Response(game, status=status.HTTP_400_BAD_REQUEST)
            self.logger.info(GET_SUCCESSFULLY.format(GAME))
            serializer = GameSerializer(game, many=True)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        # User_id is not right
        else:
            self.logger.info(USER_ID_ERROR)
            return Response(USER_ID_ERROR, status=status.HTTP_400_BAD_REQUEST)

    def post_game(self, request):
        """
           :param request: played game data
           :return: status of request. (game data stored or not)
       """
        serializer = GameSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic(), reversion.create_revision():
                    self.logger.info(VALID.format(GAME))
                    GameEntity.objects.create(**serializer.validated_data)
                    # reversion.add_to_revision(serializer.data)
                    # submit_reversion(request)
                    # self.logger.info(REVERSION_CREATED.format(request.method,request.user))
                    self.logger.info(CREATED.format(GAME))
                    return Response(data=serializer.data, status=status.HTTP_201_CREATED)
            except Exception as ex:
                full_traceback = traceback.format_exc()
                self.logger.info(full_traceback)
                return Response(ex, status=status.HTTP_400_BAD_REQUEST)
        else:
            self.logger.error(VALIDATION_FAIL.format(GAME, serializer.errors))
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
