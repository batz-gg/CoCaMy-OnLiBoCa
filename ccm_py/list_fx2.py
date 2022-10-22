# Python Code Challenges: Lists (Advanced)
# 1. Every Three Numbers
def every_three_nums(start):
    return list(range(start, 101, 3))
print(every_three_nums(91))
# [91, 94, 97, 100]

# 2. Remove Middle
def remove_middle(lst, start, end):
  return lst[:start] + lst[end+1:]
print(remove_middle([4, 8, 15, 16, 23, 42], 1, 3))
# [4, 23, 42]

# 3. More Frequent Item
def more_frequent_item(lst, item1, item2):
  if lst.count(item1) >= lst.count(item2):
    return item1
  else:
    return item2
print(more_frequent_item([2, 3, 3, 2, 3, 2, 3, 2, 3], 2, 3))
# 3

# 4. Double Index
def double_index(lst, index):
  # Checks to see if index is too big
  if index >= len(lst):
    return lst
  else:
    # Gets the original list up to index
    new_lst = lst[0:index]
 # Adds double the value at index to the new list 
  new_lst.append(lst[index]*2)
  #  Adds the rest of the original list
  new_lst = new_lst + lst[index+1:]
  return new_lst
print(double_index([3, 8, -10, 12], 2))
# [3, 8, -20, 12]

# 5. Middle Item
def middle_element(lst):
  if len(lst) % 2 == 0:
    sum = lst[int(len(lst)/2)] + lst[int(len(lst)/2) - 1]
    return sum / 2
  else:
    return lst[int(len(lst)/2)]
print(middle_element([5, 2, -10, -4, 4, 5]))
# -7.0