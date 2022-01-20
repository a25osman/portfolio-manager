DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS assets CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  hashed_password VARCHAR(255)
);

CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  coin_name VARCHAR(255),
  coin_symbol VARCHAR(255),
  is_favourite BOOLEAN DEFAULT TRUE
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  asset_id INTEGER REFERENCES assets(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 0,
  exchange_symbol VARCHAR(255),
  exchange_value DOUBLE PRECISION, 
  date_transaction DATE,
  is_crypto BOOLEAN DEFAULT FALSE
);