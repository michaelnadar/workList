const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    console.log(username,password)
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      Username:username,
      Password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.Id, username: newUser.Username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'An error occurred during registration.' });
  }
};
const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find user by username
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Compare hashed passwords
      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: user.Id, username: user.Username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({ token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'An error occurred during login.' });
    }
  };

  module.exports = {register,login};   