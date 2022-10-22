def hotel_cost(nights):
    return 140 * nights


def plane_ride_cost(city):
    if city == "Charlotte":
        return 183
    elif city == "Tampa":
        return 220
    elif city == "Pittsburgh":
        return 222
    elif city == "Los Angeles":
        return 475


def rental_car_cost(days):
    day_cost = 40
    total = day_cost * days
    if days >= 7:
        total -= 50
    elif days >= 3:
        total -= 20
    return total


def trip_cost(city, days, spending_money):
    return spending_money + rental_car_cost(days) + hotel_cost(days - 1) + plane_ride_cost(city)


print(trip_cost("Los Angeles", 5, 600))
