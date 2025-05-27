const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./destinations.db');

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'assets')));

// Homepage route
app.get('/', (req, res) => {
  db.all("SELECT * FROM destinations", (err, rows) => {
    if (err) return res.status(500).send("DB Error");
    res.render('index', { destinations: rows });
  });
});

// Destination detail route
app.get('/destinations/:name', (req, res) => {
  const name = req.params.name;
  db.get("SELECT * FROM destinations WHERE LOWER(name) = LOWER(?)", [name], (err, row) => {
    if (err || !row) return res.status(404).send("Destination not found");
    res.render('destination', { destination: row });
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
