import json, urllib.request, urllib.error
url = 'http://127.0.0.1:8000/api/auth/register/'
data = json.dumps({
    'username': 'testuser12345',
    'email': 'testuser12345@example.com',
    'password': 'Test1234',
    'password2': 'Test1234',
    'first_name': 'Test',
    'last_name': 'User'
}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req) as res:
        print(res.status)
        print(res.read().decode())
except urllib.error.HTTPError as e:
    print('HTTP', e.code)
    print(e.read().decode())
except Exception as err:
    print('ERR', err)
