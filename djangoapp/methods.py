import reversion
from django.utils import timezone


def submit_reversion(request):
    reversion.set_comment(request.method)
    reversion.set_date_created(date_created=timezone.now())
