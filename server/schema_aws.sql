-- fill in your schema here

DROP DATABASE IF EXISTS products;

CREATE DATABASE products;

\c products;

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT,
    slogan TEXT,
    description TEXT,
    category TEXT,
    default_price INTEGER NOT NULL
);
COPY products(id, name, slogan, description, category, default_price)
FROM '/home/ubuntu/sdc/product.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE features (
    id SERIAL PRIMARY KEY,
    current_product_id INTEGER,
    feature TEXT,
    value TEXT
);
COPY features(id, current_product_id, feature, value)
FROM '/home/ubuntu/sdc/features.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE styles (
    id SERIAL PRIMARY KEY,
    current_product_id INTEGER,
    name TEXT,
    sale_price TEXT,
    original_price INTEGER,
    default_style BOOLEAN
);
COPY styles(id, current_product_id, name, sale_price, original_price, default_style)
FROM '/home/ubuntu/sdc/styles.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE photos (
    id SERIAL PRIMARY KEY,
    style_id INTEGER,
    url TEXT,
    thumbnail_url TEXT
);
COPY photos(id, style_id, url, thumbnail_url)
FROM '/home/ubuntu/sdc/photos.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE skus (
    id SERIAL PRIMARY KEY,
    styleId INTEGER,
    size TEXT,
    quantity SMALLINT
);
COPY skus(id, styleId, size, quantity)
FROM '/home/ubuntu/sdc/skus.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE related_products (
    id SERIAL PRIMARY KEY,
    current_product_id INTEGER NOT NULL,
    related_product_id INTEGER NOT NULL
);
COPY related_products(id, current_product_id, related_product_id)
FROM '/home/ubuntu/sdc/related.csv'
DELIMITER ','
CSV HEADER;

CREATE INDEX styleIndex ON styles (current_product_id);
CREATE INDEX featureIndex ON features (current_product_id);
CREATE INDEX photosIndex ON photos (style_id);
CREATE INDEX skusIndex ON skus (styleId);
CREATE INDEX relatedIndex ON related_products (current_product_id);
