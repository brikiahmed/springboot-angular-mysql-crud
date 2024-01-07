// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Create connection to MySQL database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pfeback',
  port: 3306
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('Failed to connect to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

app.use(bodyParser.json());

// Get all records
app.get('/api/records', (req, res) => {
  const query = 'SELECT * FROM tutorials';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving records:', err);
      res.status(500).json({ error: 'Failed to retrieve records' });
    } else {
      res.json(results);
    }
  });
});

// Add a record
app.post('/api/records', (req, res) => {
  const { name, description } = req.body;
  const query = 'INSERT INTO records (name, description) VALUES (?, ?)';
  db.query(query, [name, description], (err, result) => {
    if (err) {
      console.error('Error adding record:', err);
      res.status(500).json({ error: 'Failed to add record' });
    } else {
      res.json({ id: result.insertId, name, description });
    }
  });
});

// Update a record
app.put('/api/records/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const query = 'UPDATE records SET name = ?, description = ? WHERE id = ?';
  db.query(query, [name, description, id], err => {
    if (err) {
      console.error('Error updating record:', err);
      res.status(500).json({ error: 'Failed to update record' });
    } else {
      res.sendStatus(200);
    }
  });
});

// Delete a record
app.delete('/api/records/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM records WHERE id = ?';
  db.query(query, [id], err => {
    if (err) {
      console.error('Error deleting record:', err);
      res.status(500).json({ error: 'Failed to delete record' });
    } else {
      res.sendStatus(200);
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
