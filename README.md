# Built with

1. nest.js and swagger



### Assignment - QBEEP

### TITLE: Simple Food App Backend

OBJECTIVE

- Build and deploy a simple backend (API only) for a food ordering app using NestJs Framework
- REQUIREMENTS
1. Use NestJs Framework and any relevant packages with PostgreSQL
2. Deploy the work locally via Docker
3. Restful APIs to handle requests
4. Employ good programming practices

- TASKS
1. API for login/access control for user
2. API for search/list restaurants/outlets
3. API for search/list food
4. API for ordering food

- DELIVERABLES
1. Code Repository: Containing all scripts, documentation, and setup instructions.
2. Documentation: A short report describing:
    o The architecture and components.
    o Results and observations.
    o Challenges faced and solutions implemented.
3. Demo (Zoom or Face2Face): A working/deployed prototype demonstrating the backend processes (API calls from Postman).

## my notes
1. basic login / register
2. Restful API 
. 

### relationship between User-Order-Food-Restaurant
- An user can have many Orders
- Each order can have many Foods from same restaurant
- Each order can have only belongs to one restaurant
 
- A restaurant can have many Foods
- A restaurant can have many Orders

- Each Food has a price
- Each order has a totalPrice
- Each order can only belongs to one user
   

### endpoint -/api/v1/

- 