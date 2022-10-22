# Python Code Challenges: Loops (Advanced)
# 1. Larger Sum
def larger_sum(lst1, lst2):
  sum1 = 0
  sum2 = 0
  for number in lst1:
    sum1 += number
  for number in lst2:
    sum2 += number
  if sum1 >= sum2:
    return lst1
  else: 
    return lst2
print(larger_sum([1, 9, 5], [2, 3, 7]))
# Output: [1, 9, 5]

# 2. Over 9000
def over_nine_thousand(lst):
  sum = 0
  for number in lst:
    sum += number
    if (sum > 9000):
      break
  return sum
print(over_nine_thousand([8000, 900, 120, 5000]))
# Output: 9020

# 3. Max Num
def max_num(nums):
  maximum = nums[0]
  for number in nums:
    if number > maximum:
      maximum = number
  return maximum
print(max_num([50, -10, 0, 75, 20]))
# Output: 75

# 4. Same Values
def same_values(lst1, lst2):
  new_lst = []
  for index in range(len(lst1)):
    if lst1[index] == lst2[index]:
      new_lst.append(index)
  return new_lst
print(same_values([5, 1, -10, 3, 3], [5, 10, -10, 3, 5]))
# Output: [0, 2, 3]

# 5. Reversed List
def reversed_list(lst1, lst2):
  for index in range(len(lst1)):
    if lst1[index] != lst2[len(lst2) - 1 - index]:
      return False
  return True
print(reversed_list([1, 2, 3], [3, 2, 1]))
print(reversed_list([1, 5, 3], [3, 2, 1]))
# Output: True
#         False