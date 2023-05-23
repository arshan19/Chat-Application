const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
const User = require('../models/userModel');

//User Registration
const registerUser = async (req,res) =>{
    try {
        const { username, password}=req.body;

        //cheak if the username already exists
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(400).json({error: 'Username already exists'})
        }

        //hash the password 
        const HashedPassword = await bcrypt.hash(password,10);

        //create a new user
        const user = new User({
            username,
            password: HashedPassword,
        });
        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
    //code for user Registration 
}

const loginUser = async (req, res )=>{
    try {
        const {username,password} = req.body;

        //cheak if the user Exists 
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({error:'Invalid Username or Password'});
        }

        //Generate A JWT Token
        const token = jwt.sign({id:user._id},process.env.ACCESS_TOKEN_SECERT,{ expiresIn: "25m" });

        res.json({token});
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }

}

module.exports ={
    registerUser,
    loginUser
};
