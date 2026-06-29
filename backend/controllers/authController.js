import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../utils/supabase.js';

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find admin by email
    const { data: admins, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .limit(1);

    if (error) throw error;

    if (!admins || admins.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const admin = admins[0];

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, admin.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    // req.admin is set by the requireAuth middleware
    const { data: admin, error } = await supabase
      .from('admins')
      .select('id, email, name, created_at')
      .eq('id', req.admin.id)
      .single();

    if (error || !admin) {
        return res.status(404).json({ message: 'Admin not found' });
    }

    res.json(admin);
  } catch (error) {
    next(error);
  }
};
