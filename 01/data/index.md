# データ型、変数

## データはオブジェクト

Pythonにおいてデータはオブジェクトであり、

- 型
- ID
- 値
- 参照カウント

+αで構成される。

>Python における オブジェクト (object) とは、データを抽象的に表したものです。Python プログラムにおけるデータは全て、オブジェクトまたはオブジェクト間の関係として表されます。

参考 : [3. データモデル &#8212; Python 3.10.0b2 ドキュメント](view-source:https://docs.python.org/ja/3/reference/datamodel.html#objects-values-and-types)

となるので、プリミティブ型はないと思っていい？

## データ型

### イミュータブル

|名前|データ型|例|
|---|---|---|
|真偽値|bool|True, Flase|
|整数|int|1|
|浮動小数点数|float|3.14|
|複素数|complex|3j|
|文字列|str|str|
|タプル|tuple|(2,3,4)|
|バイト|bytes|b'ab\xff'|
|frozenset|frozenset|frozenset(['hoge', 'foo'])|

### ミュータブル

|名前|データ型|例|
|---|---|---|
|リスト|list|[1, 2, 3]|
|バイト配列|bytearray|bytearray(...)|
|集合|set|{3, 5, 7}|
|辞書|dict|{'age': 14}|