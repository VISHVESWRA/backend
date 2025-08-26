// server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

// In-memory user database (for demo purposes)
const users = [
  {
    id: 1,
    username: 'testuser',
    passwordHash: bcrypt.hashSync('password123', 10) // Hash your passwords!
  }
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Login page (form)
app.get('/login', (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <input name="username" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  `);
});

// Handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.passwordHash)) {
    req.session.userId = user.id;
    res.send('Login successful!');
  } else {
    res.status(401).send('Invalid username or password');
  }
});

// Protected route
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send('You must be logged in to view this page');
  }
  res.send('Welcome to your dashboard!');
});

// Logout
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('Logged out successfully');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});