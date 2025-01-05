# Grocify
A platform to compare product prices across stores, suggest the least expensive items, and reduce food waste.

## Features
- Price comparison
- Item Recommendaion
- Smart shopping list
- Shop Prediction

## API Endpoints

##### URL 

<http://localhost:3000/api/auth/register>

##### Request Type

**POST**

##### Headers

 **Content-Type: application/json**

##### Body

**raw { "username" : "username", "email" : "email", "password" : "password" }**

##### URL 

<http://localhost:3000/api/auth/login>

##### Request Type

**POST**

##### Headers

 **Content-Type: application/json**

##### Body

**raw { "email" : "email", "password" : "password" }**

##### URL 

<http://localhost:3000/api/user>

##### Request Type

**GET**

##### Headers

 **Authorization: JWT TOKEN** (JWT TOKEN is obtained from /login endpoint)