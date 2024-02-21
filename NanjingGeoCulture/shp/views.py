from django.shortcuts import render

from django.core.serializers import serialize

# Create your views here.
def index(request):

    return render(request, 'index.html')