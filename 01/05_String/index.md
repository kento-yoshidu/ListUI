# 文字列

## リテラル

### ダブルクオートとシングルクオート

ダブルクオートかシングルクオートで囲う。

```python
print("Hello World")
print('Python')
```

文字列にシングルクオートを使いたいならダブルクオートで囲う。逆も然り。

print("That's a Sun")
#=> That's a Sun
print('This is "good idea"')
#=> This is "good idea"

### トリプルクオート

`"""`や`'''`で囲めば文字列の改行ができる。

```python
longstr = """Lorem ipsum dolor sit amet,
consectetur adipisicing elit,
sed do eiusmod tempor incididunt"""

print(longstr)
#=>Lorem ipsum dolor sit amet,
#=>consectetur adipisicing elit,
#=>sed do eiusmod tempor incididunt
```

## `str()`

```python
print(str(1)) #=> 1
print(str(1) + str(10)) #=> 110
print(str(True)) #=> 1
print(str(None)) #=> None
```

## エスケープシーケンス

`\t`でタブ。

```python
print("a\tbc")
print("ab\tc")
print("\tabc")
#=> a       bc
#=> ab      c
#=>         abc
```

\nで改行。

## *で繰り返し

```python
print("Na" * 10)
#=> NaNaNaNaNaNaNaNaNaNa
```

## オフセット

JavaScriptの配列のように`[]`の形で文字にアクセスできる。`[-1]`は末尾、文字列数を超えると例外。

```Python
print("123456"[0])
#=> 1
print("123456"[-1])
#=> 6
print("123456"[10])
#=> string index out of range
```

文字列型はイミュータブルなので、値を書き換えることはできない。

```python
str = "Hello"

print(str[0] = "T")
#=> expression cannot contain assignment, perhaps you meant "=="?
```

## スライス

スライスで値を抜き出せる。

```python
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
```





```






