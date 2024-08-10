-- Create the database (if it doesn't exist)
CREATE DATABASE IF NOT EXISTS tienda_online;
USE tienda_online;

-- Drop tables if they already exist
DROP TABLE IF EXISTS Purchases;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Products;

-- Create the Users table
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the Products table
CREATE TABLE Products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    category VARCHAR(100),
    rating DECIMAL(3, 2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the Purchases table
CREATE TABLE Purchases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    products JSON NOT NULL,  -- Stores the purchased products as a JSON array
    totalAmount DECIMAL(10, 2) NOT NULL,
    purchaseDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);

-- Insert sample data into the Users table
INSERT INTO Users (username, email, password) VALUES
('john_doe', 'john@example.com', 'password123'),
('jane_doe', 'jane@example.com', 'password456');

-- Insert sample data into the Products table
INSERT INTO Products (name, description, price, image, category, rating) VALUES
('Mens Casual Premium Slim Fit T-Shirts', 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket.', 22.3, 'mens_tshirt.jpg', 'Clothes', 4.1),
('Solid Gold Petite Micropave', 'Satisfaction Guaranteed. Return or exchange any order within 30 days.', 168.00, 'gold_micropave.jpg', 'Jewelry', 4.8),
('White Gold Plated Princess', 'Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.', 9.99, 'white_gold_ring.jpg', 'Jewelry', 4.6),
('WD 2TB Elements Portable External Hard Drive', 'USB 3.0 and USB 2.0 Compatibility.', 64.99, 'wd_2tb_hard_drive.jpg', 'Gadgets', 4.7),
('Acer Aspire 5 Slim Laptop', '15.6 inches Full HD IPS Display, AMD Ryzen 3 3200U.', 359.99, 'acer_aspire_laptop.jpg', 'Gadgets', 4.5);

-- Insert sample data into the Purchases table
INSERT INTO Purchases (userId, products, totalAmount) VALUES
(1, '[{"id": 1, "name": "Mens Casual Premium Slim Fit T-Shirts", "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket.", "price": 22.3, "image": "mens_tshirt.jpg", "category": "Clothes", "quantity": 2}, {"id": 4, "name": "WD 2TB Elements Portable External Hard Drive", "description": "USB 3.0 and USB 2.0 Compatibility.", "price": 64.99, "image": "wd_2tb_hard_drive.jpg", "category": "Gadgets", "quantity": 1}]', 109.59),
(2, '[{"id": 2, "name": "Solid Gold Petite Micropave", "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.", "price": 168.00, "image": "gold_micropave.jpg", "category": "Jewelry", "quantity": 1}, {"id": 3, "name": "White Gold Plated Princess", "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her.", "price": 9.99, "image": "white_gold_ring.jpg", "category": "Jewelry", "quantity": 3}]', 195.97);

-- Create Stored Procedures

-- Stored Procedure to Get All Purchases by a Specific User
DELIMITER $$
CREATE PROCEDURE GetUserPurchases(IN user_id INT)
BEGIN
    SELECT * FROM Purchases WHERE userId = user_id;
END $$
DELIMITER ;

-- Stored Procedure to Add a New Product
DELIMITER $$
CREATE PROCEDURE AddProduct(
    IN prod_name VARCHAR(255),
    IN prod_description TEXT,
    IN prod_price DECIMAL(10, 2),
    IN prod_image VARCHAR(255),
    IN prod_category VARCHAR(100),
    IN prod_rating DECIMAL(3, 2)
)
BEGIN
    INSERT INTO Products (name, description, price, image, category, rating)
    VALUES (prod_name, prod_description, prod_price, prod_image, prod_category, prod_rating);
END $$
DELIMITER ;

-- Stored Procedure to Calculate Total Sales for a Specific Product
DELIMITER $$
CREATE PROCEDURE CalculateTotalSales(IN product_id INT)
BEGIN
    DECLARE total_sales DECIMAL(10, 2) DEFAULT 0;
    DECLARE purchase_product JSON;
    DECLARE purchase_product_id INT;
    DECLARE purchase_quantity INT;
    
    DECLARE done INT DEFAULT FALSE;
    DECLARE purchase_cursor CURSOR FOR SELECT products FROM Purchases;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    OPEN purchase_cursor;
    read_loop: LOOP
        FETCH purchase_cursor INTO purchase_product;
        IF done THEN
            LEAVE read_loop;
        END IF;

        -- Extract and sum the quantities of the specified product from the JSON array
        SET purchase_quantity = JSON_UNQUOTE(JSON_EXTRACT(purchase_product, CONCAT('$[0].quantity')));
        SET purchase_product_id = JSON_UNQUOTE(JSON_EXTRACT(purchase_product, CONCAT('$[0].id')));
        
        IF purchase_product_id = product_id THEN
            SET total_sales = total_sales + (purchase_quantity * (SELECT price FROM Products WHERE id = product_id));
        END IF;
    END LOOP;
    
    CLOSE purchase_cursor;
    
    SELECT total_sales AS TotalSales;
END $$
DELIMITER ;
