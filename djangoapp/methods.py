from datetime import datetime

import reversion


def submit_reversion(request):
    reversion.set_comment(request.method)
    reversion.set_user(request.user)
    reversion.set_date_created(date_created=datetime.now())
