from django.test import TestCase

# Create your tests here.

import requests
import json
import sqlite3

# 连接数据库（如果数据库不存在，会自动创建）
conn = sqlite3.connect('db.sqlite3')

# 创建游标
cursor = conn.cursor()

def print_json_data(url):
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        for res in data['results']:
            # 执行批量插入的 SQL 语句
            cursor.execute('INSERT INTO users_person(name, gender, email) VALUES (?,?,?)', 
                               (res['name']['first'] + ' ' + res['name']['last'], res['gender'], res['email']))
            # print(res['email'], end='\n')
    else:
        print(f"请求失败，状态码: {response.status_code}")

url = "https://randomuser.me/api?results=10&page=5&pagination%5Bcurrent%5D=1&pagination%5BpageSize%5D=10&pagination%5Btotal%5D=200"  # 将 'your_url' 替换为实际的网址
print_json_data(url)


# 准备插入数据
# data = [
#     ('John', 25),
#     ('Alice', 30),
#     ('Bob', 22)
# ]

# 提交事务
conn.commit()
# 关闭连接
conn.close()