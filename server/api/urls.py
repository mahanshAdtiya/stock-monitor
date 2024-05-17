from django.urls import path
from . import views

urlpatterns = [
    path("watchlist/", views.NoteListCreate.as_view(), name="note-list"),
    path("watchlist/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note"),
]