import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Shopkeeper from '../models/Shopkeeper.js';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secretcode', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, role, shopName, location } = req.body;
    
    // Check if role is valid
    const validRoles = ['user', 'shopkeeper', 'admin'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: role || 'user',
      location: location || { type: 'Point', coordinates: [0, 0] }
    };

    if (role === 'shopkeeper') {
      userData.shopName = shopName;
    }

    const user = await User.create(userData);

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        shopName: user.shopName,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        shopName: user.shopName,
        profilePic: user.profilePic,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error. Please try again later.' });
  }
};

// @desc    Google OAuth Login
// @route   POST /api/auth/google
export const googleLogin = async (req, res) => {
  try {
    const { googleId, email, name, profilePic } = req.body;

    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      // Update googleId if not present (linked account)
      if (!user.googleId) user.googleId = googleId;
      if (!user.profilePic) user.profilePic = profilePic;
      await user.save();
    } else {
      // Create new user via Google
      user = await User.create({
        name,
        email,
        googleId,
        profilePic,
        password: await bcrypt.hash(Math.random().toString(36), 10), // Random password
        phone: 'Not Provided',
        address: 'Not Provided',
        role: 'user'
      });
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    OTP Login (Simulated)
// @route   POST /api/auth/otp-login
export const otpLogin = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Simulated OTP verification (Demo: 123456)
    if (otp !== '123456') {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: 'User not found with this phone number' });
    }

    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      token: generateToken(user._id, user.role),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

