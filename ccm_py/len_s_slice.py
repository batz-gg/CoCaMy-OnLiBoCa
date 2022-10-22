# Your code below:
toppings = ["pepperoni", "pineapple", "cheese", "sausage", "olives", "anchovies", "mushrooms"]
prices = [2, 6, 1, 3, 2, 7, 2]
num_two_dollar_slices = prices.count(2)
print(num_two_dollar_slices)
num_pizzas = len(toppings)
print("We sell " + str(num_pizzas) + " different kinds of pizza!")

pizza_and_prices = [
  [2, "pepperoni"], 
  [6, "pineapple"], 
  [1, "cheese"], 
  [3, "sausage"], 
  [2, "olives"], 
  [7, "anchovies"], 
  [2, "mushrooms"]
  ]
print(pizza_and_prices)
pizza_and_prices.sort()
cheapest_pizza = pizza_and_prices[0]
priciest_pizza = pizza_and_prices[-1]
pizza_and_prices.pop()
pizza_and_prices.insert(4, [2.5, "peppers"])
print(pizza_and_prices)
three_cheapest = pizza_and_prices[-3:]
print(three_cheapest)

#List Comprehensions: Introduction
grades = [90, 88, 62, 76, 74, 89, 48, 57]
scaled_grades = [grade + 10 for grade in grades]
print(scaled_grades)

#Ийм юмны оронд ДЭЭРХ үүүв хххх..,
# numbers = [2, -1, 79, 33, -45]
# scaled_grades = []
 
# for grade in grades:
#   scaled_grades.append(grade + 10)
 
# print(doubled)

#listREVIEW
# Your code below:
# single_digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
# single_digits = list(range(0, 10))
single_digits = list(range(10))
print(single_digits)
squares = []
for digit in single_digits:
  print(digit)
  squares.append(digit**2)
  print(squares)
  cubes = [cube**3 for cube in single_digits]
  print(cubes)

grouped_topics = [["Algorithms", "Data Structures", "AI"], ["Linear Regression", "SQL"]]
for sublist in grouped_topics:
  for sublist_element in sublist: 
    print(sublist_element)  