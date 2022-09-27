# 数値

## ブール値

Pythonにおいてブール値は`True`と`False`の2種類のみ。`bool()`を使って`True`か`False`かを判定できる。

```py
>>> bool(True)
True

>>> bool("0")
True

>>> bool(False)
False

>>> bool(0)
False
```

## 整数

`0b`、`0o`、`0x`でn進数を表現できる。

```Py
>>> 0b10
2

>>> 0o10
8

>>> 0x10
16
```

セパレーター`_`を使える。

```py
>>> 1_000_000
1000000
```

除算には2種類ある。

`/`は浮動小数点数の除算を行う。

```py
>>> 10 / 5
2.0

>>> 10 / 3
3.3333333333333335
```

`//`は整数の除算を行う。

```py
>>> 10 // 5
2

>>> 10 // 3
3
```

余りが欲しいときは`%`を使う。

```py
>>> 10 % 3
1
```

0除算はエラーになる。

```py
>>> 10 / 0
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ZeroDivisionError: division by zero
```

`divmod()`で商と余りが一度に求められる。

```py
>>> divmod(10, 3)
(3, 1)
```





