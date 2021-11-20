"""
print(11 / 3)
print (1 / 1)
print(9 // 5)

print(type(11 / 3)) # <class 'float'>
print(type(9 //5)) # <class 'int'>

print(1_000_000) # 1000000
print(1_000 + 1_000) # 2000

print(divmod(11,3)) # (3, 2)
print(type(divmod(11,3))) # <class 'tuple'>

print(bin(10)) # 0b1010
print(oct(10)) # 0o12
print(hex(255)) # 0xff

print(int("100")) # 100
print(int(0xff)) # 10進数へ変換される
print(int(True)) # 1
print(int("100", 2)) # 4
print(int("100", 8)) # 64
print(int("100", 16)) # 256

print(int(1.0)) # 1
#print(int("1.0")) # invalid literal for int() with base 10: '1.0'
print(int(1e9)) # 1000000000
print(int("1e9")) # invalid literal for int() with base 10: '1.0'

print(True + True) # 2
print(1.0 + 1) # 2.0
print(1 + "1") # unsupported operand type(s) for +: 'int' and 'str'
"""

print((10 ** 1000) ** (10 ** 1000))