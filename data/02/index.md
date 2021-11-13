Pythonは全て参照渡しである。

名前(変数)は**オブジェクト**を指しているため、代入される値を変えれば、ミュータブルな値であれば新しいオブジェクトを指すようになる。

```python
a = 1

print(a) #1

b = a

print(b) #1

a = 2

print(a) #2
print(b) #1
```

**リスト**は、ミュータブルな値の配列である。

```python
a = [1, 2, 3]

print(id(a)) # 2137096011456

b = a

print(id(b)) # 2137096011456

a[0] = 99

print(id(a)) # 2137096011456
print(id(b)) # 2137096011456

# 変数への再代入によってアドレスが変わる
a = [100, 100, 100]

print(id(a)) # 1790608015936
print(id(b)) # 1984746110656
```

[](https://excel-ubara.com/python/python016.html)