```python
arr = range(1, 50, 1)

for i in map(abs, arr):
  if i % 15 == 0:
    print(i, 'FizzBuzz')
  elif i % 3 == 0:
    print(i, "Fizz")
  elif i % 5 == 0:
    print(i, "Buzz")
```

## 代入演算子

```python
if (i := 1) == 1:
  print("this is 1")
else:
  print("this is not 1")
# this is 1
```
