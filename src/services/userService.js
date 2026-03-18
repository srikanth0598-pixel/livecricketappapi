const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const authController = require('../controllers/authController');
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "secretKey";

class UserService {
  sanitizeUser(user, extra = {}) {
    const normalizedUser = user?.toObject ? user.toObject() : user;

    if (!normalizedUser) {
      return null;
    }

    const { password, __v, ...safeUser } = normalizedUser;
    return { ...safeUser, ...extra };
  }

  async createUser(data) {
    const { name, email, password } = data;
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.otpVerified) {
      throw new Error('User already have verified and active account');
    }else if (existingUser && existingUser.active == false) {
      throw new Error('User already exists but is not active');
    }
    if (existingUser) {
      throw new Error('User already exists');
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpHashed = await bcrypt.hash(otp.toString(), 10);
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await authController.sendOTP({ ...data, otp, token: otpHashed, userId: user._id });
    if (!user) throw new Error('User creation failed');
    return this.sanitizeUser(user);
  }
  async LoginUser(data) {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
    if (!user.active) throw new Error('User is not active');
    if (!user.otpVerified) throw new Error('User is not verified');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    console.log(`User ${token} logged in successfully`);

    return this.sanitizeUser(user, { token });
  }

  async getAllUsers() {
    return await User.find().select('-password');
  }

  async getUserById(id) {
    const user = await User.findById(id).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  }

  async VerifyuserOTP(otp, token, userId) {
    const isValid = await bcrypt.compare(otp.toString(), token);
    if (!isValid) throw new Error('Invalid OTP');

    const user = await User.findByIdAndUpdate(
      userId,
      { otpVerified: true, active: true },
      { new: true }
    );

    return this.sanitizeUser(user);

  }

  async updateUser(id, data) {
    console.log(`Updating user ${id} with data:`, data);
    const { name, email, role } = data;
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    const user = await User.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: false }).select('-password');
    if (!user) throw new Error('User not found');
    return user;
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }


}

module.exports = new UserService();
