class Dog:
  def __init__(self, input_name, input_breed, input_age = 0, input_friendliness=True):
    self.name = input_name
    self.breed = input_breed
    self.age = input_age
    self.is_friendly = input_friendliness
    self.friends = []
 
  def __repr__(self):
    description = "This {breed} named {name} is {age} years old and has {number_of_friends} friends.".format(
      breed = self.breed, 
      name = self.name, 
      age = self.age, 
      number_of_friends = len(self.friends)
    )
    if self.is_friendly:
      description += " {name} is a friendly dog.".format(
        name = self.name
      )
    else:
      description += " {name} is an unfriendly dog.".format(
        name = self.name
      )
    return description
 
  def have_birthday(self):
    self.age = self.age + 1
    print("{name} had a birthday! {name} is {age} years old.".format(
        name = self.name, 
        age = self.age
      )
    )
 
  def become_friends(self, other_dog):
    if(other_dog.is_friendly):
      self.friends.append(other_dog)
      other_dog.friends.append(self)
      print("{name} become friends with {other_name}!".format(
          name = self.name, 
          other_name = other_dog.name
        )
      )
    else:
      print("{other_name} did not want to become friends with {name}!".format(
          name = self.name, 
          other_name = other_dog.name
        )
      )
 
dog_one = Dog("Sparky", "Golden Retriever", 5)
dog_two = Dog("Bruno", "Chihuahua", 10, False)
 
dog_one.have_birthday()
dog_two.become_friends(dog_one)