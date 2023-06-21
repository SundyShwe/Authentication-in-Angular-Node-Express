import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authModel from './auth.model.js';

export const signUp = async (req,res,next) =>{
    try{
        const new_user = req.body;
        const { password: plain_password } = new_user;

        if (!plain_password) throw new Error(`Password not found`);
        const hashed_password = await bcrypt.hash(plain_password, 10);

        const results = await authModel.create({
            ...new_user,
            password: hashed_password
        });

        res.json({ success: true, data: results });
    }
    catch(err){
        next(err);
    }
}
export const signIn = async (req,res,next) =>{
    try{
        const { email, password } = req.body;

        const user = await authModel.findOne({ email }).lean();
        if (!user) throw new Error(`User not found`, 401);

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error(`Wrong password`, 401);

        if (!process.env.JWT_PRIVATE_KEY) throw new Error('Could not sign token', 500);
        const JWT = jwt.sign({ _id: user._id, fullname: user.fullname, email: user.email }, process.env.JWT_PRIVATE_KEY);

        res.json({ success: true, data: JWT });
    }
    catch(err){
        next(err);
    }
}