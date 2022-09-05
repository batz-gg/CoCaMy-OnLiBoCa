# Python Code Challenges: Loops
# 1. Divisible By Ten
def divisible_by_ten(nums):
  count = 0
  for number in nums:
    if (number % 10 == 0):
      count += 1
  return count
print(divisible_by_ten([20, 25, 30, 35, 40]))
# Output: 3

# 2. Greetings
def add_greetings(names):
  new_list = []
  for name in names:
    new_list.append("Hello, " + name)
  return new_list
print(add_greetings(["Owen", "Max", "Sophie"]))
# Output: ['Hello, Owen', 'Hello, Max', 'Hello, Sophie']

# 3. Delete Starting Even Numbers
def delete_starting_evens(lst):
  while (len(lst) > 0 and lst[0] % 2 == 0):
    lst = lst[1:]
  return lst
print(delete_starting_evens([4, 8, 10, 11, 12, 15]))
print(delete_starting_evens([4, 8, 10]))
# Output: [11, 12, 15]
#         []

# 4. Odd Indices
def odd_indices(lst):
  new_lst = []
  for index in range(1, len(lst), 2):
    new_lst.append(lst[index])
  return new_lst
print(odd_indices([4, 3, 7, 10, 11, -2])
# Output: [3, 10, -2]

# 5. Exponents
def exponents(bases, powers):
  new_lst = []
  for base in bases:
    for power in powers:
      new_lst.append(base ** power)
  return new_lst
print(exponents([2, 3, 4], [1, 2, 3]))
#Write your function here
# Output: [2, 4, 8, 3, 9, 27, 4, 16, 64]