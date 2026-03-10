const userService = require('../services/userService');
const authController = require('./authController');
const axios = require("axios");
exports.getUsers = async (req, res, next) => {
  try {
     console.log('Retrieving all users');
    const users = await userService.getAllUsers();
   
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    
    const user = await userService.createUser(req.body);
    if (!user) {
      throw new Error('User creation failed');
    }else{
      

    }
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
exports.LoginUser = async (req, res, next) => {
  try {
    
    const user = await userService.LoginUser(req.body);
    if (!user) {
      throw new Error('User creation failed');
    }else{
      console.log(`User ${user} logged in successfully`);
      res.status(201).json({ success: true, data: user });
    }
  } catch (err) {
    next(err);
    }
}
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await userService.deleteUser(req.params.id);

    if (!user) {
      throw new Error('User not found');
    } else {
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    }
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      throw new Error('User not found');
    }     
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  } 
};

exports.VerifyuserOTP = async (req, res, next) => {
  try {
    const user = await userService.VerifyuserOTP(req.body.otp, req.body.token, req.body.userId);
    if (!user) {
      throw new Error('Invalid OTP');
    }     
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  } 
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      throw new Error('User not found');
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.getuserList = async (req, res, next) => {
  

  try {

    const users = await userService.getAllUsers();

    res.render("index", {
      users: users
    });

  } catch (error) {
    res.send("API Error");
  }

 

}