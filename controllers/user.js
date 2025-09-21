import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { Inngest } from '../inngest/client.js';
import { errorMonitor } from 'nodemailer/lib/xoauth2/index.js';
import { err } from 'inngest/types';

export const signup = async(req,res) => {
    const {email,password,skills = []} = req.body
    try {
       const hashed =  bcrypt.hash(password,10)
       User.create({
        email,
        password: hashed,
        skills
       }) 

       await inngest.send({
        name: 'user/signup',
        data: {
            email,
        }
       });

      const token =  jwt.sign({
        _id: User._id,
        role: User.role,
      }, process.env.JWT_SECRET,); //{expiresIn: '7d'}

      
      res.json({
        user,
        token,
      })

    } catch (error) {
        res.status(500).json({
            error: "Signup failed",
            details: error.message
        });
    }
}

export const Login = async(req,res) => {
    const {email,password} = req.body

    try {
        const user = await User.findOne({
            email
        });
        if(!user) {
            return res.status(401).json({
               error: "User not found"
            })
        }
      const Match = await bcrypt.compare(password,user.password);

      if(!Match) {
        return res.status(401).json ({
            error: "Invalid password"
        });
    }
        const token = jwt.sign({
            _id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET,); //{expiresIn: '7d'}
        res.json({
            user,
            token,
        });
    } catch (error) {
        res.status(500).json({
            error: "Login failed",
            details: error.message
        });
    }
}

export const logout = async(req,res) => {

    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                error: "Unauthorized"
            });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: "Unauthorized"
                });
            }
            return res.json({
                message: "Logged out successfully"
            });
        });
    } catch (error) {
        res.status(500).json({
            error: "Logout failed",
            details: error.message
        });
    }
}

export const updateUser = async(req,res) => {
    const {skills = [],role,email} = req.body
    try {
        if(req.user?.role !== 'admin') {
            return res.status(403).json({
                error: "Forbidden"
            });    
        }
        await User.updateOne({
            email,
            skills: skills.length ?skills : user.skills,role
        });
        return res.json({
            message: "User updated successfully"
        })
    } catch (error) {
            res.status(500).json({
                error: "Update failed",
                details: error.message
            });
        }
    }

export const getUser = async(req,res) => {
    try {
        if(req.user?.role !== 'admin') {
            return res.status(403).json({
                error: "Forbidden"
            });
        }
       const users = await User.find().select('-password -__v');
         return res.json(users);
    } catch (error) {
        res.status(500).json({
            error: "Fetch users failed",
            details: error.message
        });
    }
}