# Campers Shop Backend

This is the **backend server** for the Campers Shop e-commerce application, built with **Node.js**, **Express**, **MongoDB**, and **Mongoose**.  
It provides authentication, user management, product APIs, cart & checkout functionality, and Stripe payment integration.

---

## Features

- **User Authentication**
  - Register and login
  - JWT-based authentication
  - Role-based access control (user/admin)
  
- **User Management (Admin)**
  - View all users
  - Update user roles
  - Moderate platform content

- **Product Management**
  - CRUD operations on products
  - Filtering & searching products

- **Cart & Checkout**
  - Add, update, remove items from cart
  - Stripe payment integration

- **Error Handling**
  - Global error handler for Express
  - Handles Mongoose, Zod, and custom validation errors

---

## Admin Credentials

Use the following credentials to log in as an admin:

- **Email:** admin@admin.com  
- **Password:** admin


---
## Deployment Links

**Frontend:** https://campers-ecom-frontend.vercel.app/
**Backend:** https://campers-ecom-backend.vercel.app/


---

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Authentication:** JWT, bcrypt
- **Validation:** Zod, Mongoose
- **Payments:** Stripe API
- **Error Handling:** Global error middleware

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/devPronob/campers-shop.git
cd campers-shop/server
