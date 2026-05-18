import * as authService from '../services/authService.js';
import { responseHandler } from '../utils/responseHandler.js';

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return responseHandler.badRequest(res, 'Name, email, and password are required');
    }

    const result = await authService.registerUser({
      name,
      email,
      password,
      role: role || 'user',
    });

    return responseHandler.created(res, 'User registered successfully', result);
  } catch (error) {
    return responseHandler.error(res, 400, error.message);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return responseHandler.badRequest(res, 'Email and password are required');
    }

    const result = await authService.loginUser(email, password);

    return responseHandler.success(res, 200, 'Login successful', result);
  } catch (error) {
    return responseHandler.error(res, 401, error.message);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.userId);

    if (!user) {
      return responseHandler.notFound(res, 'User not found');
    }

    return responseHandler.success(res, 200, 'Profile fetched', { user });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = ['name', 'profilePicture'];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field]) {
        updateData[field] = req.body[field];
      }
    });

    const user = await authService.updateUser(req.userId, updateData);

    return responseHandler.success(res, 200, 'Profile updated', { user });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await authService.getAllUsers();

    return responseHandler.success(res, 200, 'Users fetched', { users });
  } catch (error) {
    return responseHandler.error(res, 500, error.message);
  }
};
