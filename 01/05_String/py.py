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

## スライス

str = "123456789"

#[:]で全体
print(str[:]) #=> 123456789

#[start:]で開始位置を指定。startの次の位置から末尾まで。
#start位置（今回の例でいう2）は含まない
print(str[3:]) #=> 456789

#[:end]で終了位置を指定。先頭からend位置まで。end位置の文字を含む
print(str[:3]) #=> 123

#[3:]と[:7]の組み合わせ
print(str[3:7]) #=> 4567

#[::2]でステップ数。2つごと（1つ飛ばし）に取り出す。
print(str[::2]) #=> 13579




