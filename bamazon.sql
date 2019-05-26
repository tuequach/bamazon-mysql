-- Creating table called products that contains all inventory index that's required 
DROP DATABASE IF EXISTS bamazon_db;

CREATE database bamazon_db;

USE bamazon_db;


-- Inserting all index

CREATE table products (
	item_id INT (100) NOT NULL AUTO_INCREMENT, 
	name VARCHAR(300) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT (200) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (name, department_name, price, stock_quantity)
VALUES ("Super Smash Bros Ultimate", "Electronic", 49.99, 80), 
("Panasonic Electric ToothBrush", "Personal Care", 89.98, 45),
("Advil", "Medicine", 7.99, 100),
("Samsung 4k LED Television Screen 60-inch", "Electronic", 698.99, 30),
("Meletonin Vitamin Gummies", "Medicine", 9.99, 80),
("PS4 Bundle Console", "Electronic", 299.99, 40),
("Crest 3D Whitening-Stripes", "Personal Care", 29.99, 50),
("Powerbeats Wireless Headphones", "Electronic", 299.99, 30),
("Claritin Liquid-Gel" , "Medicine", 8.99, 120),
("Aveeno Active Naturals Facial Cleaner" , "Personal Care", 12.99, 95);

