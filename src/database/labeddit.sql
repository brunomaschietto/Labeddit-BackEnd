-- Active: 1678934265124@@127.0.0.1@3306
CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

INSERT INTO
    users(id, name, email, password, role)
VALUES (
        "u001",
        "Bruno Maschietto",
        "brunoM@email.com",
        "bruno1234",
        "ADMIN"
    ), (
        "u002",
        "Jayce",
        "jayce@email.com",
        "jayceLover",
        "NORMAL"
    ), (
        "u003",
        "Maria Constance",
        "mariaconstance@email.com",
        "mariaC1234",
        "NORMAL"
    );