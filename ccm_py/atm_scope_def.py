# We have been assigned to work on an existing program for an ATM system. 
# The current program has bugs and needs to be fixed so we can provide the best experience for our users.

def print_balance(): 
    balance = 1000
    print("Your balance is " + str(balance))

def deduct(amount):
    balance = 1000
    print("Your new balance is " + str(balance - amount))

def calculate_interest_on_savings():
  savings = 500
  print("You will gain interest on: " + str(savings))
  def calculate_taxes():
    savings = 500
    tax_amount = savings * 0.13
    print("You will be taxed: " + str(tax_amount))
  calculate_taxes()

print_balance()
deduct(500)
calculate_interest_on_savings()

# Your balance is 1000
# Your new balance is 500
# You will gain interest on: 500
# You will be taxed: 65.0