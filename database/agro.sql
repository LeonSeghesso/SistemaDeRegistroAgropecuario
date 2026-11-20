-- Base de datos de Agro System
-- Importar con: mysql -u root -p < database/agro.sql
-- o desde phpMyAdmin: pestaña "Importar" y elegir este archivo.

CREATE DATABASE IF NOT EXISTS agro
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE agro;

CREATE TABLE IF NOT EXISTS animales (
    id               INT UNSIGNED NOT NULL AUTO_INCREMENT,
    raza             VARCHAR(50)  NOT NULL,
    peso             DECIMAL(8,2) NOT NULL,          -- peso inicial
    fecha_nacimiento DATE         NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS pesajes (
    id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_animal    INT UNSIGNED NOT NULL,
    peso         DECIMAL(8,2) NOT NULL,
    fecha_pesaje DATE         NOT NULL,
    PRIMARY KEY (id),
    -- un animal no puede tener dos pesajes el mismo día
    -- (datos.php usa MAX(fecha_pesaje) para traer el peso actual)
    UNIQUE KEY uq_animal_fecha (id_animal, fecha_pesaje),
    CONSTRAINT fk_pesajes_animal
        FOREIGN KEY (id_animal) REFERENCES animales (id)
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- Datos de ejemplo (opcional, borrar si no los querés)
INSERT INTO animales (raza, peso, fecha_nacimiento) VALUES
    ('Angus',             38.50, '2026-03-10'),
    ('Holando Argentino', 41.00, '2026-04-22');

INSERT INTO pesajes (id_animal, peso, fecha_pesaje) VALUES
    (1, 120.00, '2026-06-10'),
    (1, 185.50, '2026-09-10'),
    (2, 130.00, '2026-07-01');
