DROP TABLE IF EXISTS booking_services CASCADE;
DROP TABLE IF EXISTS mechanic_services CASCADE;
DROP TABLE IF EXISTS booking CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS car_models CASCADE;
DROP TABLE IF EXISTS car_brands CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS mechanics CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  refresh_token TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mechanics (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  specialization VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE car_brands (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE car_models (
  id SERIAL PRIMARY KEY,
  brand_id INT REFERENCES car_brands(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2),
  description TEXT
);

CREATE TABLE booking (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50) NOT NULL,
  address TEXT,
  car_brand_id INT REFERENCES car_brands(id),
  car_model_id INT REFERENCES car_models(id),
  number_plate VARCHAR(20),
  mechanic_id INT REFERENCES mechanics(id),
  car_year INT,
  service_id INT REFERENCES services(id) ON DELETE CASCADE,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  pickup_required BOOLEAN DEFAULT FALSE,
  delivery_required BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mechanic_services (
  mechanic_id INT NOT NULL,
  service_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),

  PRIMARY KEY (mechanic_id, service_id),

  FOREIGN KEY (mechanic_id)
    REFERENCES mechanics(id)
    ON DELETE CASCADE,

  FOREIGN KEY (service_id)
    REFERENCES services(id)
    ON DELETE CASCADE
);