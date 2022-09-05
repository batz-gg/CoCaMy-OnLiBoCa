from collections import deque

class TreeNode:
  def __init__(self, value):
   self.value = value
   self.children = []

  def __str__(self):
    stack = deque()
    stack.append([self, 0])
    level_str = "\n"
    while len(stack) > 0:
      node, level = stack.pop()

      if level > 0:
        level_str += "| "*(level-1)+ "|-"
      level_str += str(node.value)
      level_str += "\n"
      level+=1
      for child in reversed(node.children):
        stack.append([child, level])

    return level_str
