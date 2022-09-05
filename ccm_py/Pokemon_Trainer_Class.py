class Pokemon:
    # To create a pokemon, give it a name, type, and level. Its max health is determined by its level. Its starting health is its max health and it is not knocked out when it starts.
    def __init__(self, name, type, level=5):
        self.name = name
        self.level = level
        self.health = level * 5
        self.max_health = level * 5
        self.type = type
        self.is_knocked_out = False

    def __repr__(self):
        # Printing a pokemon will tell you its name, its type, its level and how much health it has remaining
        return "This level {level} {name} has {health} hit points remaining. They are a {type} type Pokemon".format(
            level=self.level,
            name=self.name,
            health=self.health,
            type=self.type
        )

    def revive(self):
        # Reviving a pokemon will flip it's status to False
        self.is_knocked_out = False
        # A revived pokemon can't have 0 health. This is a safety precaution. revive() should only be called if the pokemon was given some health, but if it somehow has no health, its health gets set to 1.
        if self.health == 0:
            self.health = 1
        print("{name} was revived!".format(name=self.name))

    def knock_out(self):
        # Knocking out a pokemon will flip its status to True.
        self.is_knocked_out = True
        # A knocked out pokemon can't have any health. This is a safety precaution. knock_out() should only be called if heath was set to 0, but if somehow the pokemon had health left, it gets set to 0.
        if self.health != 0:
            self.health = 0
        print("{name} was knocked out!".format(name=self.name))

    def lose_health(self, amount):
        # Deducts heath from a pokemon and prints the current health reamining
        self.health -= amount
        if self.health <= 0:
            # Makes sure the health doesn't become negative. Knocks out the pokemon.
            self.health = 0
            self.knock_out()
        else:
            print("{name} now has {health} health.".format(
                name=self.name,
                health=self.health
            )
            )

    def gain_health(self, amount):
        # Adds to a pokemon's heath
        # If a pokemon goes from 0 heath, then revive it
        if self.health == 0:
            self.revive()
        self.health += amount
        # Makes sure the heath does not go over the max health
        if self.health >= self.max_health:
            self.health = self.max_health
        print("{name} now has {health} health.".format(
            name=self.name,
            health=self.health
        )
        )

    def attack(self, other_pokemon):
        # Checks to make sure the pokemon isn't knocked out
        if self.is_knocked_out:
            print("{name} can't attack because it is knocked out!".format(
                name=self.name))
            return
        # If the pokemon attacking has a disadvantage, then it deals damage equal to half its level to the other pokemon
        if (self.type == "Fire" and other_pokemon.type == "Water") or
        (self.type == "Water" and other_pokemon.type == "Grass") or
        (self.type == "Grass" and other_pokemon.type == "Fire"):
            print("{my_name} attacked {other_name} for {damage} damage.".format(
                my_name=self.name,
                other_name=other_pokemon.name,
                damage=round(self.level * 0.5)
            )
            )
            print("It's not very effective")
            other_pokemon.lose_health(round(self.level * 0.5))
        # If the pokemon attacking has neither advantage or disadvantage, then it deals damage equal to its level to the other pokemon
        if (self.type == other_pokemon.type):
            print("{my_name} attacked {other_name} for {damage} damage.".format(
                my_name=self.name,
                other_name=other_pokemon.name,
                damage=self.level
            )
            )
            other_pokemon.lose_health(self.level)
        # If the pokemon attacking has advantage, then it deals damage equal to double its level to the other pokemon
        if (self.type == "Fire" and other_pokemon.type == "Grass") or
        (self.type == "Water" and other_pokemon.type == "Fire") or
        (self.type == "Grass" and other_pokemon.type == "Water"):
            print("{my_name} attacked {other_name} for {damage} damage.".format(
                my_name=self.name,
                other_name=other_pokemon.name,
                damage=self.level * 2
            )
            )
            print("It's super effective")
            other_pokemon.lose_health(self.level * 2)


class Trainer:
    # A trainer has a list of pokemon, a number of potions and a name. When the trainer gets created, the first pokemon in their list of pokemons is the active pokemon (number 0)
    def __init__(self, pokemon_list, num_potions, name):
        self.pokemons = pokemon_list
        self.potions = num_potions
        self.current_pokemon = 0
        self.name = name

    def __repr__(self):
        # Prints the name of the trainer, the pokemon they currently have, and the current active pokemon.
        print("The trainer {name} has the following pokemon".format(
            name=self.name))
        for pokemon in self.pokemons:
            print(pokemon)
        return "The current active pokemon is {name}".format(name=self.pokemons[self.current_pokemon].name)

    def switch_active_pokemon(self, new_active):
        # Switches the active pokemon to the number given as a parameter
        # First checks to see the number is valid (between 0 and the length of the list)
        if new_active < len(self.pokemons) and new_active >= 0:
            # You can't switch to a pokemon that is knocked out
            if self.pokemons[new_active].is_knocked_out:
                print("{name} is knocked out. You can't make it your active pokemon".format(
                    name=self.pokemons[new_active].name))
            # You can't switch to your current pokemon
            elif new_active == self.current_pokemon:
                print("{name} is already your active pokemon".format(
                    name=self.pokemons[new_active].name))
            # Switches the pokemon
            else:
                self.current_pokemon = new_active
                print("Go {name}, it's your turn!".format(
                    name=self.pokemons[self.current_pokemon].name))

    def use_potion(self):
        # Uses a potion on the active pokemon, assuming you have at least one potion.
        if self.potions > 0:
            print("You used a potion on {name}.".format(
                name=self.pokemons[self.current_pokemon].name))
            # A potion restores 20 health
            self.pokemons[self.current_pokemon].gain_health(20)
            self.potions -= 1
        else:
            print("You don't have any more potions")

    def attack_other_trainer(self, other_trainer):
        # Your current pokemon attacks the other trainer's current pokemon
        my_pokemon = self.pokemons[self.current_pokemon]
        their_pokemon = other_trainer.pokemons[other_trainer.current_pokemon]
        my_pokemon.attack(their_pokemon)


# Six pokemon are made with different levels. (If no level is given, it is level 5)
a = Pokemon("Charmander", "Fire", 7)
b = Pokemon("Squirtle", "Water")
c = Pokemon("Lapras", "Water", 9)
d = Pokemon("Bulbasaur", "Grass", 10)
e = Pokemon("Vulpix", "Fire")
f = Pokemon("Staryu", "Water", 4)


# Getting input to get the trainers names and letting them select the Pokemon they want.
trainer_one_name = input(
    "Welcome to the world of Pokemon. Please enter a name for player one and hit enter. ")
trainer_two_name = input("Hi, " + str(trainer_one_name) +
                         "! Welcome! Let's find you an opponent. Enter a name for the second player. ")

choice = input("Hi, " + trainer_two_name + "! Let's pick our Pokemon! " + trainer_one_name +
               ", would you like a Level 7 Charmander, or a Level 7 Squirtle? " + trainer_two_name + " will get the other one. Type either 'Charmander' or 'Squirtle'. ")

while choice != 'Charmander' and choice != 'Squirtle':
    choice = input(
        "Whoops, it looks like you didn't choose 'Charmander' or 'Squirtle'. Try selecting one again! ")

# Keeping track of which pokemon they chose
trainer_one_pokemon = []
trainer_two_pokemon = []

if choice == 'Charmander':
    trainer_one_pokemon.append(a)
    trainer_two_pokemon.append(b)

else:
    trainer_one_pokemon.append(b)
    trainer_two_pokemon.append(a)

# Selecting the second pokemon
choice = input(trainer_two_name + ", would you like a Level 9 Lapras, or a Level 10 Bulbasaur? " +
               trainer_one_name + " will get the other one. Type either 'Lapras' or 'Bulbasaur'. ")

while choice != 'Lapras' and choice != 'Bulbasaur':
    choice = input(
        "Whoops, it looks like you didn't choose 'Lapras' or 'Bulbasaur'. Try selecting one again! ")

if choice == 'Lapras':
    trainer_one_pokemon.append(d)
    trainer_two_pokemon.append(c)

else:
    trainer_one_pokemon.append(c)
    trainer_two_pokemon.append(d)

# Selecting the third pokemon
choice = input(trainer_one_name + ", would you like a Level 5 Vulpix, or a Level 4 Staryu? " +
               trainer_two_name + " will get the other one. Type either 'Vulpix' or 'Staryu'. ")

while choice != 'Vulpix' and choice != 'Staryu':
    choice = input(
        "Whoops, it looks like you didn't choose 'Vulpix' or 'Staryu'. Try selecting one again! ")

if choice == 'Vulpix':
    trainer_one_pokemon.append(e)
    trainer_two_pokemon.append(f)

else:
    trainer_one_pokemon.append(f)
    trainer_two_pokemon.append(e)

# Creating the Trainer objects with the given names and pokemon lists
trainer_one = Trainer(trainer_one_pokemon, 3, trainer_one_name)
trainer_two = Trainer(trainer_two_pokemon, 3, trainer_two_name)

print("Let's get ready to fight! Here are our two trainers")

print(trainer_one)
print(trainer_two)

# Testing attacking, giving potions, and switching pokemon. This could be built out more to ask for input
trainer_one.attack_other_trainer(trainer_two)
trainer_two.attack_other_trainer(trainer_one)
trainer_two.use_potion()
trainer_one.attack_other_trainer(trainer_two)
trainer_two.switch_active_pokemon(0)
trainer_two.switch_active_pokemon(1)
