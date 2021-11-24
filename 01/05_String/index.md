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

