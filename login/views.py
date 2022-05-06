import json
import os

from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from static.radiate import radiate
import numpy as np


# Create your views here.


def index(request):
    # return HttpResponse('hello world')
    return render(request, 'index.html')


def loader(request):
    return render(request, 'loader.html')


def readme(request):
    return render(request, 'readme.md')


def show(request):
    return render(request, 'show.html')


def preview(request):
    return render(request, 'preview.html')


def requestUrl(request):
    data = json.loads(request.body)
    path = data['path']
    sequence_name = data['sequence_name']
    alpha = {
        'path': path,
        'sequence': sequence_name,
    }
    print(path, sequence_name)
    # os.system('python -v')
    return HttpResponse(request, 'show.html')


def imgSolving(request):
    data = json.loads(request.body)
    root_path = 'static/radiate/data/radiate/'
    sequence_name = 'tiny_foggy'

    # time (s) to retrieve next frame
    dt = 0.25

    # load sequence
    seq = radiate.Sequence(os.path.join(root_path, sequence_name))

    count = 0
    form = {}

    # play sequence
    for t in np.arange(seq.init_timestamp, seq.end_timestamp, dt):
        count = count + 1
        form[count] = t
        output = seq.get_from_timestamp(t)
        seq.vis_all(output, 1)

    d = dict()

    for i in range(1, count):
        d.setdefault(i, form[i])

    print(d.values())
    return JsonResponse(d)
