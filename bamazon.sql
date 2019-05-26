-- Creating table called products that contains all inventory index needed

DROP DATABASE IF EXISTS bamazon_db;

CREATE database bamazon_db;

USE bamazon_db;

CREATE table products (
id INT (100) NOT NULL AUTO_INCREMENT, 
	name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT (200) NOT NULL,
    PRIMARY KEY (id)
);

-- Inserting data into table


INSERT INTO products (id, name, department_name, price, stock_quantity)
VALUES (2, "Super Smash Bros Ultimate", "Electronic", 49.99, 80), 
(5, "Panasonic Electric ToothBrush", "Personal Care", 89.98, 45),
(1, "Advil", "Medicine", 7.99, 100),
(4, "Samsung 4k LED Television Screen 60-inch", "Electronic", 698.99, 30),
(10, "Meletonin Vitamin Gummies", "Medicine", 9.99, 80),
(3, "PS4 Bundle Console", "Electronic", 299.99, 40),
(8, "Crest 3D Whitening-Stripes", "Personal Care", 29.99, 50),
(9, "Powerbeats Wireless Headphones", "Electronic", 299.99, 30),
(7, "Claritin Liquid-Gel" , "Medicine", 8.99, 120),
(6, "Aveeno Active Naturals Facial Cleaner" , "Personal Care", 12.99, 95);