from datetime import datetime

now = datetime.now()
print(now)
print(now.year)
print(now.month)
print(now.day)
print(now.hour)
print(now.minute)
print(now.second)
# print now.mill

import time
milliseconds = int(round(time.time() * 1000))
print(milliseconds)

format_string = "%A, %d %B %Y, %H:%M:%S.%f"
a_datetime = datetime.now()
current_time_string = a_datetime.strftime(format_string)
print(current_time_string)

print(datetime.now().strftime("%f"))
