---
name: b4a-login
description: Login with the b4A ReST API to recieve an access token. Use when the user wants to create an access token for further b4A ReST API calls or when the user wants to login to Automic with the b4A ReST API. b4A and best4Automic are the same product, the b4A ReST API is the same as the best4Automic ReST API.
---

# b4A Login

## create a request to login to b4A ReST API

The login request is a POST request to the `/login` endpoint of the b4A ReST API. The request body must contain the following parameters:
username: The username of the user.
password: The password of the user.
language: The language of the user. This parameter is optional and defaults to "en" (English) if not provided. optional value is "de" (German).
The base URL for the b4A ReST API is must be provided in the .env file as `B4A_API_BASE_URL=` example `B4A_API_BASE_URL='https://localhost:8080'`. The base URL must be provided without a trailing slash.

request example

```http
http://localhost:8080/login
{
  "username": "user",
  "password": "pass",
  "language": "en"
}
```

## get the access token from the response header

The access token is returned in the response header as `Authorization`. This token must be stored so that it can be used for subsequent API calls. The token is use as a Bearer token in the Authorization header of subsequent requests. The token is valid for a limited time and must be refreshed before it expires.

## get the expiration time from the response body

The expiration time of the access token is returned in the response body as `expires`. The expiration time can be stored so that the token can be refreshed before it expires (optional as required).

example response

```json
{
  "roles": [
    {
      "name": "B4A.DEMO.USRG.ALLGEMEIN",
      "title": "Allgemein"
    }
  ],
  "user": {
    "username": "USERNAME/DEPARTMENT",
    "firstName": "Firstname",
    "lastName": "Lastname"
  },
  "emailAddress": "mail@example.com",
  "expires": "2026-08-21T19:33:41.000Z",
  "restRoles": ["INFO", "SERVICE", "MODULE", "ADMIN"]
}
```
