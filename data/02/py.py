a = 1

print(a) #1

b = a

print(b) #1

a = 2

print(a) #2
print(b) #1

c = 1

###

print(id(c)) # 2240597983472

d = c

print(id(d)) # 2274620670192
# この時点ではIDは同じ

c = 2
print(id(c)) # 1422953742608
# 代入するとIDが変わる
