import json, urllib.request, urllib.error, random
username = 'testuser' + str(random.randint(100000,999999))
payload = {'username': username, 'email': username + '@example.com', 'password': 'Test1234', 'password2': 'Test1234', 'first_name': 'Test', 'last_name': 'User'}
req = urllib.request.Request('http://127.0.0.1:8000/api/auth/register/', data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
try:
    with urllib.request.urlopen(req) as res:
        status = res.status
        body = res.read().decode()
except urllib.error.HTTPError as e:
    status = e.code
    body = e.read().decode()
except Exception as err:
    status = None
    body = str(err)
open('request_register_result.txt', 'w', encoding='utf-8').write('STATUS:{}\nBODY:{}\n'.format(status, body))
