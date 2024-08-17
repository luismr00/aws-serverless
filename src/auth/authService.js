const jwt = require('jsonwebtoken');

const mockUsers = [
  { username: 'test', password: 'password' }
];

const login = (req, res) => {
  const { username, password } = req.body;
  const user = mockUsers.find(u => u.username === username && u.password === password);
  console.log('hello from login');
  if (user) {
    const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });
    return res.json({ token });
  }
  return res.status(401).json({ message: 'Invalid credentials' });
};

const register = (req, res) => {
  const { username, password } = req.body;
  mockUsers.push({ username, password });
  return res.status(201).json({ message: 'User registered' });
};

module.exports = { login, register };
