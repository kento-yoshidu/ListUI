## 基本文法

標準出力は`print()`。

```py
print("Hello World")
#=> Hello World
```

`#`で1行コメントアウト。`"""`で複数行のコメントアウト。

```py
# print("Hello World")

"""
print("Hello World)
print("Hello World)
"""
```

## 変数宣言

```py
msg = "Hello World"
print(msg)
#=> Hello World
```

再代入可能。

```py
msg = "Hello World"
print(msg)
#=> Hello World

msg = "Hello Python"
print(msg)
#=> Hello Python
```

Pythonは定数をサポートしていません。ただ、慣習的に大文字を使うことで定数を宣言していることを伝えます。

```py
TAX = 0.1
```

## データ型

Pythonの値は全て**オブジェクト**であり、プリミティブ型は存在しません。

`type`関数を使用することでObjectの型を確認できます。

## string型

ダブルクオート`"`またはシングルクオート`'`で囲い、文字列を表現します。

```py
print(type("Hello World"))
#=> <type 'str'>

print(type('Hello World'))
#=> <type 'str'>
```

## int型、float型

```py
print(type(1))
#=> <type 'int'>

print(type(1.0))
#=> <type 'float'>
```

## complex型

`j`ないし`J`を付けることで複素数を表現できます。

```py
print(type(3 + 4j))
#=> <type 'complex'>
```

## boolean型

`True`と`False`です。頭文字が大文字なことに注意してください。

```py
print(type(True))
#=> <type 'bool'>
print(type(False))
#=> <type 'bool'>
```

## 参考

[Python3基礎文法 - Qiita](https://qiita.com/Fendo181/items/a934e4f94021115efb2e)

[Pythonの基本的な組み込み型とその一般論まとめ - Qiita](https://qiita.com/nakasan/items/bc9ba8eb57f5b7a22698)
