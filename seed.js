const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./travel.db');

db.serialize(() => {
  db.run('DELETE FROM destinations'); // clear

  const stmt = db.prepare('INSERT INTO destinations (slug, name, description, image) VALUES (?, ?, ?, ?)');
  stmt.run('paris', 'Paris', 'Explore the city of love and lights.', '/assets/images/paris.jpg');
  stmt.run('tokyo', 'Tokyo', 'A vibrant city mixing tradition and technology.', '/assets/images/tokyo.jpg');
  stmt.finalize();

  console.log('Seeded destinations!');
});
