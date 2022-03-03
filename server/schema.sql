-- fill in your schema here

CREATE DATABASE products;

CREATE EXTENSION store;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    slogan TEXT,
    description TEXT,
    category TEXT,
    default_price INTEGER NOT NULL
);

CREATE TABLE features (
    id SERIAL PRIMARY KEY,
    current_product_id INTEGER,
    feature TEXT,
    value TEXT
);

CREATE TABLE styles (
    id SERIAL PRIMARY KEY,
    current_product_id INTEGER,
    name TEXT,
    sale_price TEXT,
    original_price INTEGER,
    default_style BOOLEAN
);

CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    style_id INTEGER,
    url TEXT,
    thumbnail_url TEXT
);

CREATE TABLE skus (
    id SERIAL PRIMARY KEY,
    styleId INTEGER,
    size TEXT,
    quantity SMALLINT
);

CREATE TABLE related_products (
    id SERIAL PRIMARY KEY,
    current_product_id INTEGER NOT NULL,
    related_product_id INTEGER NOT NULL
);