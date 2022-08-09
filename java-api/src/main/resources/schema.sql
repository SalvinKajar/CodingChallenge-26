DROP TABLE IF EXISTS dogs;
DROP TABLE IF EXISTS trades;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS securities;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS counterparties;


CREATE TABLE dogs (
id INT NOT NULL,
name VARCHAR(250) NOT NULL,
age INT NOT NULL
);


CREATE TABLE users (
id INT PRIMARY KEY,
name VARCHAR(250) NOT NULL,
email VARCHAR(250) NOT NULL,
role VARCHAR(250) NOT NULL
);



CREATE TABLE securities (
id INT PRIMARY KEY,
isin INT NOT NULL,
cusip INT NOT NULL,
issuer VARCHAR(250) NOT NULL,
maturitydate DATE NOT NULL,
coupon INT NOT NULL,
type VARCHAR(250) NOT NULL,
facevalue INT NOT NULL,
status VARCHAR(250) NOT NULL


);

CREATE TABLE books (
id INT PRIMARY KEY,
bookname VARCHAR(250) NOT NULL
);


CREATE TABLE counterparties (
id INT PRIMARY KEY,
name VARCHAR(250) NOT NULL
);


CREATE TABLE trades (
id INT PRIMARY KEY,
book_id INT NOT NULL,
counterparty_id INT NOT NULL,
security_id INT NOT NULL,
quantity INT NOT NULL,
status VARCHAR(250) NOT NULL,
price INT NOT NULL,
buysell VARCHAR(250) NOT NULL,
tradedate DATE NOT NULL,
settlementdate DATE NOT NULL,
FOREIGN KEY (book_id) REFERENCES books(id),
FOREIGN KEY (counterparty_id) REFERENCES counterparties(id),
FOREIGN KEY (security_id) REFERENCES securities(id)
);



