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

print(int(0xff)) # 10進数へ変換 255
```