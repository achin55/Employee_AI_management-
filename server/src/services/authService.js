import User from '../models/User.js';
import { generateToken } from '../config/jwt.js';

export const registerUser = async (userData) => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const user = new User(userData);
    await user.save();

    const token = generateToken(user._id);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await user.comparePassword(password);

    if (!passwordMatch) {
      throw new Error('Invalid password');
    }

    const token = generateToken(user._id);

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (id, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw error;
  }
};
