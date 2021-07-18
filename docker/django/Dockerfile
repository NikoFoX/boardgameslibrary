FROM python:3.8
ENV   PYTHONUNBUFFERED 1
RUN mkdir /app
COPY backend/requirements/base.txt /app/
RUN pip install -r app/base.txt
WORKDIR /app
COPY ./backend .
