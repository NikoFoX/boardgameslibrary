from django.contrib import admin

# Register your models here.
from django.contrib.auth import get_user_model


@admin.register(get_user_model())
class UserAdmin(admin.ModelAdmin):
    list_display = ["username", "name", "email"]
