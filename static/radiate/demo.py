# import eel
import radiate
import numpy as np
import os

# eel.init("Z:/csvLoader")


# path to the sequence
root_path = 'data/radiate/'
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


# @eel.expose  # Expose this function to js
# def my_python_function(a, b):
#     # path to the sequence
#     root_path = a
#     sequence_name = b
#
#     # time (s) to retrieve next frame
#     dt = 0.25
#
#     # load sequence
#     seq = radiate.Sequence(os.path.join(root_path, sequence_name))
#
#     # play sequence
#     for t in np.arange(seq.init_timestamp, seq.end_timestamp, dt):
#         output = seq.get_from_timestamp(t)
#         seq.vis_all(output, 0)
#
#
# @eel.expose  # Expose this function to js
# def adding(a, b):
#     return a+b
#
#
# eel.start("show.html")

