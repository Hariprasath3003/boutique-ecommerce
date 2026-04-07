#!/usr/bin/env python
import json
import urllib.request
import urllib.error
import random

# Generate unique username
username = f"testuser{random.randint(100000, 999999)}"

# Prepare payload
payload = {
    "username": username,
    "email": f"{username}@example.com",
    "password": "Test1234",
    "password2": "Test1234",
    "first_name": "Test",
    "last_name": "User"
}

print(f"Testing registration with username: {username}")

# Create request
url = "http://127.0.0.1:8000/api/auth/register/"
data = json.dumps(payload).encode('utf-8')
req = urllib.request.Request(
    url,
    data=data,
    headers={'Content-Type': 'application/json'}
)

# Send request
try:
    with urllib.request.urlopen(req) as response:
        status = response.status
        body = response.read().decode('utf-8')
        print(f"✓ Success! Status: {status}")
        result = json.loads(body)
        print(f"✓ User created: {result['user']['username']}")
        print(f"✓ User role: {result['user']['role']}")
except urllib.error.HTTPError as e:
    status = e.code
    body = e.read().decode('utf-8')
    print(f"✗ Error! Status: {status}")
    print(f"Response: {body}")
except Exception as e:
    print(f"✗ Exception: {e}")
