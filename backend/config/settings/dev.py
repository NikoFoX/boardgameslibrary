from .base import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

INSTALLED_APPS += [
    'corsheaders'
]

MIDDLEWARE += [
    'corsheaders.middleware.CorsMiddleware',
]

CORS_ORIGIN_ALLOW_ALL = True

# LOGGER
# LOGGING = {
#    'version': 1,
#    'disable_existing_loggers': False,
#    'formatters': {
#        'verbose': {
#            'format': ('%(asctime)s [%(process)d] [%(levelname)s] ' +
#                       'pathname=%(pathname)s lineno=%(lineno)s ' +
#                       'funcname=%(funcName)s %(message)s'),
#            'datefmt': '%Y-%m-%d %H:%M:%S'
#        },
#        'plain': {
#            'format': '%(message)s',
#            'datefmt': '%Y-%m-%d %H:%M:%S'
#        }
#    },
#    'handlers': {
#        'console': {
#            'level': 'DEBUG',
#            'class': 'logging.StreamHandler',
#            'formatter': 'plain'
#        },
#    },
#    'loggers': {
#        '': {
#            'handlers': ['console'],
#            'level': 'INFO',
#            'propagate': False,
#        },
#        'django.db.backends': {
#            'handlers': ['console'],
#            'level': 'DEBUG',
#            'propagate': False,
#        },
#    }
# }
