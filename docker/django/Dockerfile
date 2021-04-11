FROM python:3.8
ENV   PYTHONUNBUFFERED 1
RUN mkdir /app
COPY backend/requirements/base.txt /app/
RUN pip install -r app/base.txt
COPY . /app
ENV DJANGO_SETTINGS_MODULE=config.settings.dev
WORKDIR /app/backend
EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
