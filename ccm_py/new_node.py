class Node:
    def __init__(self, value, next_node=None):
        self.value = value
        self.next_node = next_node


class LinkedList:
    def __init__(self, head_node=None):
        self.head_node = head_node

    def stringify_list(self):
        string_list = ""
        current_node = self.head_node
        while current_node:
            string_list += str(current_node.value) + "."
            current_node = current_node.next_node
        return string_list


a = Node(5)
b = Node(70, a)
c = Node(5675, b)
d = Node(90, c)
ll = LinkedList(d)

print(ll.stringify_list())
