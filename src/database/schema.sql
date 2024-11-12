CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha_hash VARCHAR(255) NOT NULL,
    genero VARCHAR(50),
    data_nascimento DATE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE User_Types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_tipo VARCHAR(50) NOT NULL,
    nivel_acesso INT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE User_Type_Assignments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_user_type INT NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_user_type) REFERENCES User_Types(id) ON DELETE CASCADE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Digital_Cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    numero_carteirinha VARCHAR(50) UNIQUE NOT NULL,
    validade DATE NOT NULL,
    data_emissao DATE DEFAULT CURRENT_DATE,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES Users(id) ON DELETE CASCADE
);


CREATE TABLE Smart_Bracelets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    codigo_serial VARCHAR(50) UNIQUE NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES Users(id) ON DELETE CASCADE
);


CREATE TABLE Access_History (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_card INT NOT NULL,
    id_user INT,
    tipo_visita VARCHAR(50) NOT NULL,
    registrado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_card) REFERENCES Digital_Cards(id),
    FOREIGN KEY (id_user) REFERENCES Users(id)
);


CREATE TABLE Companies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_empresa VARCHAR(255) NOT NULL,
    beneficio VARCHAR(255) NOT NULL, 
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    operacao VARCHAR(255) NOT NULL,
    tabela_afetada VARCHAR(255) NOT NULL,
    id_registro INT NOT NULL,
    id_usuario INT NOT NULL,
    data_operacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Users(id)
);



-- Boas praticas
Responsável cria uma conta: Ele preenche os dados no frontend e pode informar que ele mesmo é autista ou cadastrar outra pessoa.

QR Code gerado automaticamente: O QR Code é associado a uma página pública, contendo as informações essenciais.

Botão de Pânico na Pulseira: Ao ser pressionado, alerta automaticamente os responsáveis e a central de atendimento.

Histórico de Acesso: Cada vez que o QR Code é escaneado, um registro é adicionado ao Access_History, distinguindo entre visitas anônimas e autenticadas.

Carteirinhas Físicas e Digitais: A carteirinha digital é usada para concessões de benefícios, validada por número único.

Logs de Auditoria: Toda alteração é registrada na tabela Logs para fins de controle.