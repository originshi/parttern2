# encoding: utf-8  
print("1111");
def a():
    print("a");
    if True:
        print(1);
    else:
        print(2);
        print(u"执行完了");


import json

data = [ { 'a' : 1, 'b' : 2, 'c' : 3, 'd' : 4, 'e' : 5 } ]

json = json.dumps(data)
print data;