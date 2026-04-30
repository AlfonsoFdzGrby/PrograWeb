from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('alta/', views.alta, name='alta'),
    path('api/servicios/', views.agregar_servicio, name='agregar_servicio'),
]
