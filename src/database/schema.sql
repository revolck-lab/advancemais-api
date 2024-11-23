-- Tabela de papel (role)
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    status TINYINT(1) NOT NULL,  -- Boolean em MySQL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de gênero (gender)
CREATE TABLE gender (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- Tabela de escolaridade (education)
CREATE TABLE education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Tabela de endereço (address)
CREATE TABLE address (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    cep CHAR(8) NOT NULL
);

-- Tabela de categoria de cursos (category)
CREATE TABLE category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Tabela de modalidade de cursos (modality)
CREATE TABLE modality (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Tabela de usuário (user)
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,  -- Validar no código
    phone_user CHAR(11) NOT NULL,
    gender_id INT NOT NULL,
    education_id INT NOT NULL,
    status TINYINT(1) DEFAULT 1,  -- Boolean em MySQL
    code_user INT NOT NULL UNIQUE,
    role_id INT NOT NULL,  -- Sempre NOT NULL
    address_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (gender_id) REFERENCES gender(id),
    FOREIGN KEY (education_id) REFERENCES education(id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (address_id) REFERENCES address(id)
);

-- Tabela de estado (state)
CREATE TABLE state (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Tabela de empresa (company)
CREATE TABLE company (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cnpj CHAR(14) NOT NULL UNIQUE,  -- Validar no código
    trade_name VARCHAR(255) NOT NULL,
    business_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    address_id INT NOT NULL,
    whatsapp CHAR(11) NOT NULL,
    mobile_phone CHAR(11) NOT NULL,
    landline_phone CHAR(11),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    status TINYINT(1) DEFAULT 1,  -- Boolean em MySQL
    role_id INT NOT NULL,  -- Sempre NOT NULL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (address_id) REFERENCES address(id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

-- Tabela de vaga de emprego (vacancy)
CREATE TABLE vacancy (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    requirements TEXT NOT NULL,
    activities TEXT NOT NULL,
    benefits VARCHAR(255),
    notes VARCHAR(255),
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    status TINYINT(1) DEFAULT 1,  -- Boolean em MySQL
    company_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES company(id)
);

-- Tabela de candidatura (application)
CREATE TABLE application (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vacancy_id INT NOT NULL,
    user_id INT NOT NULL,
    application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vacancy_id) REFERENCES vacancy(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Tabela de banner
CREATE TABLE banner (
    id INT AUTO_INCREMENT PRIMARY KEY,
    banner_url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de carrossel de empresas (carousel_company)
CREATE TABLE carousel_company (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de carrossel (carousel)
CREATE TABLE carousel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de imagem de curso (course_image)
CREATE TABLE course_image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    url VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    description VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de thumbnail de curso (course_thumbnail)
CREATE TABLE course_thumbnail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    thumbnail_url VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabela de curso (course)
CREATE TABLE course (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id INT NOT NULL,
    instructor_id INT NOT NULL,
    course_image_id INT NOT NULL,
    thumbnail_id INT NOT NULL,
    modality_id INT NOT NULL,
    workload INT NOT NULL,
    vacancies INT NOT NULL,
    price INT NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (instructor_id) REFERENCES user(id),
    FOREIGN KEY (course_image_id) REFERENCES course_image(id),
    FOREIGN KEY (thumbnail_id) REFERENCES course_thumbnail(id),
    FOREIGN KEY (modality_id) REFERENCES modality(id)
);