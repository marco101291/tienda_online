# Online Store Application

This is a full-stack web application for an online store where users can browse, purchase various products like clothes, jewelry, and gadgets, and manage their accounts. The project is divided into two main parts: the frontend built with React.js and the backend built with Express.js and Node.js.

## Table of Contents

- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Using the SQL File](#using-the-sql-file)
- [Frontend Components](#frontend-components)
- [Backend Functions](#backend-functions)
- [Running the Application](#running-the-application)
- [Database Setup](#database-setup)
- [License](#license)

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
    git clone https://github.com/your-username/online-store.git
    cd online-store
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
    DB_NAME=tienda_online
    SECRET_KEY=your_secret_key_for_jwt
    ```

## Using the SQL File

To set up the database for this application, you'll need to use the provided `database.sql` file. This file includes the necessary tables (`Users`, `Products`, `Purchases`), sample data, and stored procedures.

### Instructions

1. **Locate the `database.sql` file:**

    The `database.sql` file is located in the `server/database/` directory.

2. **Create the database using MySQL Workbench:**

    - Open MySQL Workbench and connect to your MySQL server.
    - Go to `File > Open SQL Script` and navigate to the `database.sql` file.
    - Execute the script by clicking on the "lightning bolt" icon.

3. **Create the database using the command line:**

    If you prefer using the command line, run the following command:

    ```bash
    mysql -u your_username -p tienda_online < server/database/database.sql
    ```

    Replace `your_username` with your MySQL username.

4. **Verify the database:**

    After running the script, verify that the `tienda_online` database has been created with the `Users`, `Products`, and `Purchases` tables populated with sample data.

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

## Running the Application

### Start the Backend

```bash
cd server
npm run dev
