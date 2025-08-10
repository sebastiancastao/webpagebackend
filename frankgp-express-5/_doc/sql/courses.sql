-- DROP TABLES (orden inverso para evitar conflictos si se ejecuta más de una vez)
DROP TABLE IF EXISTS comments, progress, lessons, modules, enrollments, courses, users;

-- USERS
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- COURSES
CREATE TABLE courses (
    id CHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) DEFAULT 0.00,
    is_free BOOLEAN DEFAULT TRUE,
    certificate BOOLEAN DEFAULT FALSE,
    created_by CHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- ENROLLMENTS
CREATE TABLE enrollments (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    course_id CHAR(36),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_enrollment (user_id, course_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- MODULES
CREATE TABLE modules (
    id CHAR(36) PRIMARY KEY,
    course_id CHAR(36),
    title VARCHAR(255) NOT NULL,
    `order` INT DEFAULT 0,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- LESSONS
CREATE TABLE lessons (
    id CHAR(36) PRIMARY KEY,
    module_id CHAR(36),
    title VARCHAR(255) NOT NULL,
    content TEXT,
    video_url VARCHAR(255),
    download_url VARCHAR(255),
    code_snippet TEXT,
    `order` INT DEFAULT 0,
    FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
);

-- PROGRESS
CREATE TABLE progress (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    lesson_id CHAR(36),
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL,
    UNIQUE KEY unique_progress (user_id, lesson_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

-- COMMENTS
CREATE TABLE comments (
    id CHAR(36) PRIMARY KEY,
    user_id CHAR(36),
    lesson_id CHAR(36),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);
