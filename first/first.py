with open('input.txt') as f:
    max1 = 0
    max2 = 0
    max3 = 0
    curr = 0
    for line in f:
        if line.strip():
            curr += int(line.rstrip())
        else:
            if curr > max1:
                max3 = max2
                max2 = max1
                max1 = curr
            elif curr > max2:
                max3 = max2
                max2 = curr
            elif curr > max3:
                max3 = curr
            curr = 0

print(max1 + max2 + max3)
