# Feature:
- This is an assignment task
- A simple Backend Restful API, for simple food ordering apps
- built with NestJS, postgresql, prisma, docker

API endpoints:
```
# Public endpoints
GET /api/v1/outlets
  query: [name]

GET /api/v1/outlets/:outlet_id

GET /api/v1/foods
  query: [id,name]

POST /api/v1/users/login
  {
    "username" : "admin",
    "password" : "admin"
  }
-----------------------------------------
# Authorized endpoints
GET /api/v1/orders

GET /api/v1/orders/:order_id

POST /api/v1/orders
  {
    "outlet_id": 1,
    "note": "No chili please",
    "total_price": 1500,
    "ordered_foods": [
      { "food_id": 2, "quantity": 1 },
      { "food_id": 3, "quantity": 2 }
    ]
  }

```

### Prerequisite:
- install docker cli, docker desktop/engine
- install node.js

### Usage
1. git clone link pls
1. open docker desktop/ docker engine
1. run `npm install`
1. run  `docker compose up`
2. run `npx prisma generate`
3. run `npx prisma migrate dev`
4. run `npx prisma db seed`
5. access at http://localhost:3000/ or http://localhost:3000/api for Swagger API doc



# Assignments
### Simple Food App Backend
### OBJECTIVE

- Build and deploy a simple backend (API only) for a food ordering app using NestJs Framework
- REQUIREMENTS
  
1. Use NestJs Framework and any relevant packages with PostgreSQL
1. Deploy the work locally via Docker
1. Restful APIs to handle requests
1. Employ good programming practices

- TASKS
1. API for login/access control for user
1. API for search/list restaurants/outlets
1. API for search/list food
1. API for ordering food

- DELIVERABLES
1. Code Repository: Containing all scripts, documentation, and setup instructions.
1. Documentation: A short report describing:
    o The architecture and components.
    o Results and observations.
    o Challenges faced and solutions implemented.
1. Demo (Zoom or Face2Face): A working/deployed prototype demonstrating the backend processes (API calls from Postman).

---

### My notes
1. basic login
2. Restful API 

### Assumption to build the relationship between User-Order-Food-Outlet-OrderedItems
- An user can have many Orders
- Each order can have many Foods from same restaurant
- Each order can only belong to one restaurant
 
- A restaurant can have many Foods
- A restaurant can have many Orders

- Each Food has a price
- Each order has a totalPrice
- Each order can only belongs to one user
   