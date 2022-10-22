# Python Code Challenges: Lists
# 1. Append Size
def append_size(lst):
  lst.append(len(lst))
  return lst
print(append_size([23, 42, 108]))
# [23, 42, 108, 3]

# 2. Append Sum
def append_sum(lst):
  lst.append(lst[-1] + lst[-2])
  lst.append(lst[-1] + lst[-2])
  lst.append(lst[-1] + lst[-2])
  return lst
print(append_sum([1, 1, 2]))
# [1, 1, 2, 3, 5, 8]

# 3. Larger List
def larger_list(lst1, lst2):
  if len(lst1) >= len(lst2):  
    return lst1[-1]
  else:
    return lst2[-1]
print(larger_list([4, 10, 2, 5], [-10, 2, 5, 10]))
# 5

# 4. More Than N
def more_than_n(lst, item, n):
  if lst.count(item) > n:
    return True
  else:
    return False
print(more_than_n([2, 4, 6, 2, 3, 2, 1, 2], 2, 3))
# True

# 5. Combine Sort
def combine_sort(lst1, lst2):
  unsorted = lst1 + lst2
  sortedList = sorted(unsorted)
  return sortedList
print(combine_sort([4, 10, 2, 5], [-10, 2, 5, 10]))
# [-10, 2, 2, 4, 5, 5, 10, 10]