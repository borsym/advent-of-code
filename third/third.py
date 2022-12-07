prior = {
    "a": 1,
    "z": 26,
    "A": 27,
    "Z": 52,
}


def getPrior(c):
    if "a" <= c <= "z":
        return ord(c) - ord("a") + 1
    elif "A" <= c <= "Z":
        return ord(c) - ord("A") + 27


# with open('input.txt') as f:
#     cnt = 0
#     for line in f:
#         line = line.strip()
#         firstpart, secondpart = line[:len(line)//2], line[len(line)//2:]
#         firstpart = set(firstpart)
#         secondpart = set(secondpart)
#         intersect = list(firstpart.intersection(secondpart))
#         for i in intersect:
#             cnt += getPrior(i)

def get_intersect(getPrior, three_lines, cnt):
    first, second, third = set(three_lines[0]), set(
        three_lines[1]), set(three_lines[2])
    intersect = list(first.intersection(second, third))
    cnt += getPrior(intersect[0])
    three_lines = []
    return three_lines, cnt


with open('input.txt') as f:
    three_lines = []
    cnt = 0
    for line in f:
        if len(three_lines) == 3:
            three_lines, cnt = get_intersect(getPrior, three_lines, cnt)
        three_lines.append(line.strip())
    if len(three_lines) == 3:
        three_lines, cnt = get_intersect(getPrior, three_lines, cnt)

print(cnt)
