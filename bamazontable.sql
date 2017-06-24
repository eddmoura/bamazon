CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(40),
department_name VARCHAR(40),
price DECIMAL(6,2),
stock_quantity INTEGER(4),
PRIMARY KEY (item_id)
)