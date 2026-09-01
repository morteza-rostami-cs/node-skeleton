const schema = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        hashed_password TEXT NOT NULL,
        session TEXT
    );
`;

export function initializeDatabase(db) {
  db.exec(schema);
}
