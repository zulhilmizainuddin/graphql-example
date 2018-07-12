CREATE TABLE if not exists owner(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE);

CREATE TABLE if not exists pet(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ownerid INTEGER,
    name TEXT NOT NULL UNIQUE,
    colour TEXT NOT NULL,
    age INTEGER NOT NULL,
    breed TEXT NOT NULL,
    FOREIGN KEY(ownerid) REFERENCES owner(id));