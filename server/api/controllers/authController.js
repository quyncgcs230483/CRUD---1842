const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username has already exist!' });
    }

    // Create new user
    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: 'Register successful!' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering account' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Hard-coded secret key as you want
    const token = jwt.sign(
      { id: user._id, username: user.username },
      'SECRET_KEY',
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful!', token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
