-- Active: 1680228192698@@127.0.0.1@3306

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

SELECT * FROM users;

CREATE TABLE
    posts(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        comments INTEGER DEFAULT(0) NOT NULL,
        likes INTEGER DEFAULT(0) NOT NULL,
        dislikes INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id)
    );

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
    );

INSERT INTO
    posts(
        id,
        creator_id,
        content,
        comments,
        likes,
        dislikes
    )
VALUES (
        "p001",
        "u001",
        "Hello World!",
        1,
        2,
        1
    ), (
        "p002",
        "u003",
        "Oi turma!",
        2,
        2,
        0
    ), (
        "p003",
        "u002",
        "King James babe!!!",
        500,
        1000,
        0
    );

SELECT * FROM posts;

CREATE TABLE
    comments(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER DEFAULT(0) NOT NULL,
        dislikes INTEGER DEFAULT(0) NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
    );

CREATE TABLE
    likes_dislikes_comments(
        user_id TEXT NOT NULL,
        comment_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (comment_id) REFERENCES comments(id)
    );

INSERT INTO comments(id, creator_id, post_id, content)
VALUES("c001", "u001", "p002", "Oi");

SELECT * FROM comments;

SELECT
    comments.id,
    comments.creator_id,
    comments.post_id,
    comments.content,
    comments.likes,
    comments.dislikes,
    comments.created_at,
    users.name AS creator_name
    FROM comments
    JOIN users ON comments.creator_id = users.id
    JOIN posts ON comments.post_id = posts.id;