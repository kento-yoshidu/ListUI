"""
## 文字列の定義
print("Hello World")
print('Python')

print("That's a Sun")
#=> That's a Sun
print('This is "good idea"')
#=> This is "good idea"

longstr = ""Lorem ipsum dolor sit amet,
consectetur adipisicing elit,
sed do eiusmod tempor incididunt""

print(longstr)
#=>Lorem ipsum dolor sit amet,
#=>consectetur adipisicing elit,
#=>sed do eiusmod tempor incididunt

## `str()`

print(str(1)) #=> 1
print(str(1) + str(10)) #=> 110
print(str(True)) #=> 1
print(str(None)) #=> None

## エスケープシーケンス

print("a\tbc")
print("ab\tc")
print("\tabc")
#=> a       bc
#=> ab      c
#=>         abc

print("a\nbc")
#=> a
#=> bc

## *で繰り返し

print("Na" * 10)
#=> NaNaNaNaNaNaNaNaNaNa

## オフセット

print("123456"[0])
#=> 1
print("123456"[-1])
#=> 6
print("123456"[10])
#=> string index out of range

str = "Hello"

print(str[0] = "T")
#=> expression cannot contain assignment, perhaps you meant "=="?

"""
