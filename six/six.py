with open('input.txt') as f:
    line = f.readline()
    idx = 0
    while idx < len(line):
        my_set = set()
        for i in range(14):
            my_set.add(line[idx + i])
        if len(my_set) == 14:
            print("".join(my_set))
            print(idx + 14)
            break
        idx += 1
