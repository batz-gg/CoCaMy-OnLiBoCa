# import random number generator
from random import randrange
# import heap class
from min_heap import MinHeap

# make an instance of MinHeap
min_heap = MinHeap()

# populate min_heap with descending numbers
descending_nums = [n for n in range(10001, 1, -1)]
print("ADDING!")
for el in descending_nums:
    min_heap.add(el)

print("REMOVING!")
# remove minimum until min_heap is empty
min_heap.retrieve_min()
