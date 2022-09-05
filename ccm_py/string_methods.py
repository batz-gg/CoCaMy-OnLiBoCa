# .upper(), .title(), and .lower() adjust the casing of your string.
# .split() takes a string and creates a list of substrings.
# .join() takes a list of strings and creates a string.
# .strip() cleans off whitespace, or other noise from the beginning and end of a string.
# .replace() replaces all instances of a character/string in a string with another character/string. (method) replace: (__old: str, __new: str, __count: SupportsIndex = ...) -> str
# .find() searches a string for a character/string and returns the index value that character/string is found at.
# .format() allows you to interpolate a string with variables.
highlighted_poems = "Afterimages:Audre Lorde:1997,  The Shadow:William Carlos Williams:1915, Ecstasy:Gabriela Mistral:1925,   Georgia Dusk:Jean Toomer:1923,   Parting Before Daybreak:An Qi:2014, The Untold Want:Walt Whitman:1871, Mr. Grumpledump's Song:Shel Silverstein:2004, Angel Sound Mexico City:Carmen Boullosa:2013, In Love:Kamala Suraiyya:1965, Dream Variations:Langston Hughes:1994, Dreamwood:Adrienne Rich:1987"


# print(highlighted_poems)

highlighted_poems_list = highlighted_poems.split(",")

print()
# print(highlighted_poems_list)

highlighted_poems_stripped = []

for poem in highlighted_poems_list:
  highlighted_poems_stripped.append(poem.strip('  '))

print()
# print(highlighted_poems_stripped)

highlighted_poems_details = []

for detail in highlighted_poems_stripped:
  highlighted_poems_details.append(detail.split(':'))

print()
# print(highlighted_poems_details)

titles = []
poets = []
dates = []

for title in highlighted_poems_details:
  titles.append(title[0])

print()
# print(titles)

for poet in highlighted_poems_details:
  poets.append(poet[1])

print()
# print(poets)

for date in highlighted_poems_details:
  dates.append(date[2])

print()
# print(dates)

# def highlighted_poems_full (title, poet, date):
#   poem_desc = ''
#   for i in range(len(titles)):
#     title, poet, date = titles[i], poets[i], dates[i]
#   for title in titles:
#   for poet in poets:
#   for date in dates:
#   return "The poem {TITLE} was published by {POET} in {DATE}.".format(TITLE=title, POET=poet, DATE=date)

print()
# for index_of_title in titles:
#   for index_of_poet in poets:
#     for index_of_date in dates: 
#       print(highlighted_poems_full(index_of_title, index_of_poet, index_of_date))

        # print(highlighted_poems_full(title, poet, date))

# def poem_description(title, poet, date):
#   poem_desc = ''
#   for i in range(len(titles)): 
#     poem_desc = "The poem {} was published by {} in {}".format(title[i],poet[i],date[i])
#   return poem_desc

# for title in titles:
# for poet in poets:
# for date in dates:

# print(poem_description(titles, dates, poets))

counter = 0
for i in range(len(titles)):
  print("The poem " + titles[counter] + " was published by " + poets[counter] + "in " + dates[counter])
  counter = counter + 1