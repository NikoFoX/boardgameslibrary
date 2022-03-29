import datetime
import os


def get_datetime_now():
    return datetime.datetime.now()


def get_data_from_file(dir, file_name):
    with open(os.path.join(dir, file_name), 'r',
              encoding="utf-8") as file:
        return file.read()
