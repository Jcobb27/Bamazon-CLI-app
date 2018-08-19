-- Create database

DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

--create table
CREATE TABLE products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR (100) NOT NULL,
department_name VARCHAR (100) NOT NULL,
price INT NULL,
stock_quantity INT NULL,
PRIMARY KEY (item_id)
);

--insert data into table
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog leash", "pets", 15, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mascara", "beauty", 8, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sphere", "books", 10, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spyro", "entertainment", 40, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cheerios", "food", 3, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("multivitamins", "health", 5, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chew toy", "pets", 5, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("foundation", "beauty", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jurassic Park", "books", 10, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Sound and the Fury", "books", 12, 1000);