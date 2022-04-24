import socket

target_host = "0.0.0.0"
target_port = 9998

## ソケットオブジェクトの作成
## AF_INET=IPv4、SOCK_STREAM=TCP
client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

## サーバーヘ接続
client.connect((target_host, target_port))

## データ送信
client.send(b"GET / HTTP/1.1\r\nHogeHoge\r\n\r\n")

## データ受信
## recv=受信するデータ量
response = client.recv(4096)

print(response.decode())
client.close()
