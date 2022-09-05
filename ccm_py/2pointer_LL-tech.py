# 2pointer_LL-tech.py
# The pseudocode for this approach would look like the following:
# nth last pointer = None
# tail pointer = linked list head
# count = 1

# while tail pointer exists
#   move tail pointer forward
#   increment count

#   if count >= n + 1
#     if nth last pointer is None
#       set nth last pointer to head
#     else
#       move nth last pointer forward

# return nth last pointer

# Starting State
# count = 1
# T
# 1  2  3  4  5

# First Tick
# count = 2
#    T
# 1  2  3  4  5

# Second Tick
# count = 3
#       T
# N
# 1  2  3  4  5

# Third Tick
# count = 4
#          T
#    N
# 1  2  3  4  5
# Fourth Tick
# count = 5
#             T
#       N
# 1  2  3  4  5

# Final Tick
# count = 6
#                T
#          N
# 1  2  3  4  5  None


from LinkedList import LinkedList


def list_nth_last(linked_list, n):
    linked_list_as_list = []
    current_node = linked_list.head_node
    while current_node:
        linked_list_as_list.append(current_node)
        current_node = current_node.get_next_node()
    return linked_list_as_list[len(linked_list_as_list) - n]


# Complete this function:


def nth_last_node(linked_list, n):
    current = None
    tail_seeker = linked_list.head_node
    count = 1
    while tail_seeker:
        tail_seeker = tail_seeker.get_next_node()
        count += 1
        if count >= n + 1:
            if current is None:
                current = linked_list.head_node
            else:
                current = current.get_next_node()
    return current


def generate_test_linked_list():
    linked_list = LinkedList()
    for i in range(50, 0, -1):
        linked_list.insert_beginning(i)
    return linked_list


# Use this to test your code:
test_list = generate_test_linked_list()
print(test_list.stringify_list())
nth_last = nth_last_node(test_list, 4)
print(nth_last.value)


def find_middle(linked_list):
    fast = linked_list.head_node
    slow = linked_list.head_node
    while fast:
        fast = fast.get_next_node()
        if fast:
            fast = fast.get_next_node()
            slow = slow.get_next_node()
    return slow


def generate_test_linked_list(length):
    linked_list = LinkedList()
    for i in range(length, 0, -1):
        linked_list.insert_beginning(i)
    return linked_list


# Use this to test your code:
test_list = generate_test_linked_list(7)
print(test_list.stringify_list())
middle_node = find_middle(test_list)
print(middle_node.value)

# half speed


def find_middle_alt(linked_list):
    count = 0
    fast = linked_list.head_node
    slow = linked_list.head_node
    while fast:
        fast = fast.get_next_node()
        if count % 2 != 0:
            slow = slow.get_next_node()
        count += 1
    return slow


test_list = find_middle_alt(7)
print(test_list.stringify_list())
middle_node = find_middle(test_list)
print(middle_node.value)
