import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await user.findOne({email});
        if(!user){
            return res.status(401).json({success:false, message: 'Invalid email or password'});
        }

        const isMatch = await bcrypt.compare(password, user,password);
        if(!isMatch){
            return res.status(401).json({success:false, message: 'Invalid email or password'});
        };
        const token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '2d'});
        return res.status(200).json({success:true, messagae: "login successfull", token, user: {id: user._id, name: user.name, email: user.email, role: user.role}});

    }catch(error){
        console.error('Login error:', error);
        res.status(500).json({success:false, message: 'Server error'});
    };
};

export {login}