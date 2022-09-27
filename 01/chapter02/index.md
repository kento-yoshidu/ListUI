## 全てのデータはオブジェクト

オブジェクトは次のようなものからなる。

- データ型
- ID
- 値
- 参照カウント

### ミュータブルとイミュータブル

変数の値を後から書き換えられるのをミュータブル、できないものをイミュータブルと呼ぶ。

リストや辞書型などはミュータブル、その他基本的な型はイミュータブル。

## 変数

変数とは、メモリーのアドレスに名前を付けたもの。

`a-z`、`A-Z`、`0-9`、`_`が変数名として使える。ケースセンシティブであり、英字の大文字と小文字は区別される。

変数名は`_`が英字で始まらなければならない。`_`で始まる変数は特別な意味を持つ。

予約語は`help("keywords")`で出力される。

```python
>>> help("keywords")

Here is a list of the Python keywords.  Enter any keyword to get more help.

False               class               from                or
None                continue            global              pass
True                def                 if                  raise
and                 del                 import              return
as                  elif                in                  try
assert              else                is                  while
async               except              lambda              with
await               finally             nonlocal            yield
break               for                 not
```

もしくは

```python
import keyword

print(keyword.kwlist)
#=> ['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

変数やリテラルの型を知りたい時は`type()`を使用する。

```python
y = 5
# 値5の整数オブジェクトを作成
# 5のオブジェクトを指す変数yを作成
# 5オブジェクトの参照カウントをインクリメント

x = 12 - y
# 12オブジェクトを作成
# 12から5を引く
# 7を整数オブジェクトに代入し、変数xがそれを指すようにする
# 7オブジェクトの参照カウントをインクリメント
```

参照カウントが0になると、ガベージコレクターが不要になった領域を回収する。

オブジェクトがイミュータブルであれば、それは読み取り専用であり、後から値を書き換えることはできない。

```python
x = 5

y = x

x = 100
# x = 100
# y = 5
```
