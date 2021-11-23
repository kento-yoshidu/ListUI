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


