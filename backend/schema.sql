-- ============================================================
--  School Management Website — MySQL schema
--  Run with:  mysql -u root -p < schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS school_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE school_db;

-- ---- Users / auth -----------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('admin','user') NOT NULL DEFAULT 'user',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---- Notifications ----------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  content    TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ---- Achievements -----------------------------------------
CREATE TABLE IF NOT EXISTS achievements (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  category    VARCHAR(100) NOT NULL DEFAULT 'award',
  image_url   VARCHAR(500),
  achieved_on DATE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ---- Events -----------------------------------------------
CREATE TABLE IF NOT EXISTS events (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  event_date  DATE,
  image_url   VARCHAR(500),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ---- Student results --------------------------------------
CREATE TABLE IF NOT EXISTS student_results (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  marks      VARCHAR(50),
  grade      VARCHAR(50),
  `rank`     INT,
  details    TEXT,
  photo_url  VARCHAR(500),
  is_topper  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ---- Admissions -------------------------------------------
CREATE TABLE IF NOT EXISTS admissions (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  title      VARCHAR(255) NOT NULL,
  content    TEXT,
  category   VARCHAR(100) NOT NULL DEFAULT 'general',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ---- Staff profiles ---------------------------------------
CREATE TABLE IF NOT EXISTS staff_profiles (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  role        VARCHAR(255) NOT NULL,
  type        ENUM('founder','teacher') NOT NULL DEFAULT 'teacher',
  subject     VARCHAR(255),
  bio         TEXT,
  image_url   VARCHAR(500),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ---- Admission requests ------------------------------------
CREATE TABLE IF NOT EXISTS admission_requests (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  parent_name     VARCHAR(255) NOT NULL,
  parent_email    VARCHAR(255) NOT NULL,
  child_name      VARCHAR(255) NOT NULL,
  requested_class VARCHAR(50) NOT NULL,
  parent_phone    VARCHAR(100) NOT NULL,
  message         TEXT,
  status          VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ---- Contact info (singleton row) -------------------------
CREATE TABLE IF NOT EXISTS contact_info (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  address       VARCHAR(500),
  phone         VARCHAR(100),
  email         VARCHAR(255),
  map_embed_url VARCHAR(1000),
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ---- Contact messages -------------------------------------
CREATE TABLE IF NOT EXISTS contact_messages (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(255) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);