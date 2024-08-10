# Online Music Store

This is a full-stack web application for an online music store where users can browse and purchase musical instruments, as well as manage their accounts. The project is divided into two main parts: the frontend built with React.js and the backend built with Express.js and Node.js.

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Frontend Components](#frontend-components)
- [Backend Functions](#backend-functions)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)

## Project Structure

The project is structured into two main directories:

- `client/` : Contains the frontend of the application.
- `server/` : Contains the backend API and server logic.

## Technologies Used

- **Frontend**: React.js, Redux Toolkit, Tailwind CSS, Axios
- **Backend**: Node.js, Express.js, Sequelize (ORM), MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **API Integration**: Axios

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MySQL (v5.7 or higher)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/online-music-store.git
    cd online-music-store
    ```

2. **Install dependencies for both the client and server:**

    ```bash
    # Install frontend dependencies
    cd client
    npm install

    # Install backend dependencies
    cd ../server
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `server/` directory with the following variables:

    ```env
    PORT=3001
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_NAME=your_database_name
    SECRET_KEY=your_secret_key_for_jwt
    ```

## Frontend Components

### `AuthForm.jsx`

- **Purpose**: Handles user authentication (login and registration).
- **Key Functions**:
  - `toggleForm`: Switches between login and registration forms.
  - `handleSubmit`: Submits the form data to the backend for authentication.

### `CartPage.jsx`

- **Purpose**: Displays the user's cart and handles purchasing.
- **Key Functions**:
  - `handlePurchase`: Sends the cart data to the backend to process the purchase.
  - `setAlert`: Manages the display of success or error messages.

### `Navbar.jsx`

- **Purpose**: Provides navigation links throughout the application.
- **Key Functions**:
  - `handleLogout`: Logs the user out and redirects to the login page.
  - `toggleDropdown`: Toggles the display of the cart dropdown.

### `ProductList.jsx`

- **Purpose**: Displays a list of products available for purchase.
- **Key Functions**:
  - `addItemToCart`: Adds a selected product to the cart.
  - `fetchProducts`: Retrieves the product list from the backend.

## Backend Functions

### `productController.js`

- **`purchaseProduct`**: Handles the purchase of products by a user. It verifies the products, calculates the total amount, and stores the purchase in the database.

### `authController.js`

- **`registerUser`**: Registers a new user in the database.
- **`loginUser`**: Authenticates a user and issues a JWT token.
- **`logoutUser`**: Handles user logout and clears authentication cookies.

### `cartSlice.js`

- **`purchaseCart`**: An async action that sends the cart data to the backend for purchase processing. It handles success and error states, updating the UI accordingly.

## Database Setup

Ensure your MySQL server is running, and you've created a database with the name provided in the `.env` file.

Run the migrations and seed the database with initial data (if applicable):

```bash
cd server
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
