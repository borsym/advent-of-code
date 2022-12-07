with open('input.txt') as f:
    cnt = 0
    for line in f:
        line = line.split(",")
        first, second = line[0], line[1]
        f_1, f_2, s_1, s_2 = int(first.split(
            "-")[0]), int(first.split("-")[1]), int(second.split("-")[0]), int(second.split("-")[1])
        if (f_1 <= s_1 <= f_2) or (f_1 <= s_2 <= f_2) or (s_1 <= f_1 <= s_2) or (s_1 <= f_2 <= s_2):
            cnt += 1

print(cnt)
