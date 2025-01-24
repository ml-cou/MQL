
from django.contrib import admin
from django.shortcuts import render
from django.urls import path,include
from django.conf.urls.static import static



from backend_app.views import *
# def hi(request):
#     return HttpResponse("<div><p>hi</p></div>")


urlpatterns = [
    # path('',lambda request: render(request, 'hi.html')),
    # path('',hi),
    path('test_url/',test_view, name='test_view'),
    path('datasets/', list_datasets, name='list_datasets'),
    path('set_datasets/',set_datasets, name='set_datasets'),
    path('process_nl_query/',process_nl_query_view, name='process_nl_query'),
    # path('upload_file/', upload) 
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
