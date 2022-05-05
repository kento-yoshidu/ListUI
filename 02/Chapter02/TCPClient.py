import socket

target_host = "0.0.0.0"
target_port = 9998

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

client.connect((target_host, target_port))

client.send(b"GET / HTTP/1.1\r\nHogeHoge\r\n\r\n")

response = client.recv(1024)

print(response.decode("utf-8"))
client.close()
