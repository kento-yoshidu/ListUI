`/`で浮動少数点数、`//`で余りを切り捨てた整数が返ってくる。

```python
print(11 / 3) # 3.6666666666666665
print(type(11 / 3)) # <class 'float'>

print (1 / 1) # 1.0

print(9 // 5) # 1
print(type(9 //5)) # <class 'int'>
```

セパレーターとして`_`を使える。

```Python
print(1_000_000) # 1000000
print(1_000 + 1_000) # 2000
```

`divmod`は、商とあまりのタプルを返す。

```python
print(divmod(11,3)) # (3, 2)
print(type(divmod(11,3))) # <class 'tuple'>
```

## n進数への変換

```python
print(bin(10)) # 0b1010
print(oct(10)) # 0o12
print(hex(255)) # 0xff
```

# int()

整数以外の型は、`int()`で整数に変換できる

```python
print(int("100"))

# 第2引数に基数を渡せる
print(int("100", 2)) # 4
print(int("100", 8)) # 4
print(int("100", 2)) # 4
```

浮動小数点数などは変換不可

```python
print(int(1.0)) # 1
print(int("1.0")) # invalid literal for int() with base 10: '1.0'

print(int(1e9)) # 1000000000
print(int("1e9")) # invalid literal for int() with base 10: '1.0'
```

型変換

```python
print(True + True) # 2
print(1.0 + 1) # 2.0
print(1 + "1") # unsupported operand type(s) for +: 'int' and 'str'
```