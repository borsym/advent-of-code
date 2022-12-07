import math as Math
# ugly
with open('input.txt') as f:
    cnt = 0
    list_stack = [[] for i in range(30)]
    is_seen = False
    for line in f:
        if line.__contains__("move"):
            if not is_seen:
                list_stack = [x for x in list_stack if x != []]
                is_seen = True
            only_n = line.strip().split(" ")
            only_n = [int(s) for s in only_n if s.isdigit()]
            tmp_list = []
            if only_n[0] > 1:
                for i in range(int(only_n[0])):
                    if len(list_stack[int(only_n[1]) - 1]) == 0:
                        continue
                    tmp = list_stack[int(only_n[1]) - 1].pop(0)
                    tmp_list.append(tmp)
                list_stack[int(only_n[2]) - 1] = tmp_list + \
                    list_stack[int(only_n[2]) - 1]
            else:
                for i in range(int(only_n[0])):
                    if len(list_stack[int(only_n[1]) - 1]) == 0:
                        continue
                    tmp = list_stack[int(only_n[1]) - 1].pop(0)
                    list_stack[int(only_n[2]) - 1].insert(0, tmp)

        else:
            for i in range(len(line)):
                if line[i] != "[" and line[i] != "]" and line[i] != " " and line[i] != "\n" and not line[i].isdigit():
                    list_stack[Math.ceil(i / 3) - 1].append(line[i])

    for i in range(len(list_stack)):
        print("".join(list_stack[i][0]))
