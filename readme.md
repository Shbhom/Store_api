# Store API - Routes

Below are the routes for the Store API. The API provides various endpoints to manage user authentication, shopping cart, orders, and sneaker inventory. The routes are categorized based on their functionality.

## Authentication

### POST `/auth/register`
- Description: Register a new user with the provided details (username and password).
- Controller: `registerController`

### POST `/auth/login`
- Description: Authenticate the user with their credentials (username and password) to obtain an access token.
- Controller: `loginController`

## Shopping Cart

### GET `/cart`
- Description: Get the shopping cart items for the authenticated user.
- Middleware: `verifyUser`
- Controller: `getUserCart`

### PATCH `/cart`
- Description: Add a sneaker to the shopping cart for the authenticated user.
- Middleware: `verifyUser`
- Controller: `addToCart`

### DELETE `/cart`
- Description: Remove a sneaker from the shopping cart for the authenticated user.
- Middleware: `verifyUser`
- Controller: `removeFromCart`

## Orders

### GET `/order`
- Description: Get the orders for the authenticated user.
- Middleware: `verifyUser`
- Controller: `getUserOrders`

### POST `/order`
- Description: Create a new order for the authenticated user.
- Middleware: `verifyUser`
- Controller: `createOrder`

## Sneaker

### GET `/sneaker`
- Description: Get all available sneakers.
- Middleware: `verifyUser`
- Controller: `getSneaker`

### GET `/sneaker/:id`
- Description: Get a specific sneaker by its ID.
- Middleware: `verifyUser`
- Controller: `getSneakerById`
- Parameters:
  - `id`: String (required) - The ID of the sneaker to retrieve.

### POST `/sneaker`
- Description: Add a new sneaker to the inventory.
- Middleware: `verifyUser`
- Controller: `addSneakers`

### POST `/sneaker/multiple`
- Description: Add multiple sneakers to the inventory.
- Middleware: `verifyUser`
- Controller: `addMultipleSneakers`

### PUT `/sneaker`
- Description: Update an existing sneaker in the inventory.
- Middleware: `verifyUser`
- Controller: `updateSneakers`

### DELETE `/sneaker/:id`
- Description: Delete a sneaker from the inventory.
- Middleware: `verifyUser`
- Controller: `deleteSneakers`
- Parameters:
  - `id`: String (required) - The ID of the sneaker to delete.

## User

### GET `/user`
- Description: Get the details of the authenticated user.
- Middleware: `verifyUser`
- Controller: `getUser`

### GET `/user/cart`
- Description: Get the shopping cart items for the authenticated user.
- Middleware: `verifyUser`
- Controller: `getUserCart`

### PUT `/user`
- Description: Update the details of the authenticated user.
- Middleware: `verifyUser`
- Controller: `updateUser`

### DELETE `/user`
- Description: Delete the authenticated user.
- Middleware: `verifyUser`
- Controller: `deleteUser`

## Authentication and Authorization

To access most of the routes, you need to be authenticated with a valid token. The token is obtained during registration or login and should be included in the headers of your requests as shown in the Authentication section.

The `verifyUser` middleware ensures that only authenticated users can access protected routes. If the token is invalid or not provided, the middleware will return a 401 Unauthorized error, prompting the user to log in again.

Please note that some routes may require additional permissions (e.g., admin access) for certain actions.

Happy shopping! 🛍️