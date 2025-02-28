const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'vishwajitsecret$oy';

//Route 1:  create User without login createuser
router.post('/createuser',[
    body('name','Enter a valid name').isLength( {min:3} ),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 charaters').isLength( {min:5} )
], async(req, res)=>{
    let success = false;
    //If their is a error return bad request and errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({success,errors: errors.array()});
    }
    try{
    //check whether the user with this email is exists already
    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({success,error: "Sorry, The user with this email is already exists!"});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    // create a new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    })
    const data = {
        user:{
            id:user.id
        }
    }
    const authToken = jwt.sign(data,JWT_SECRET);
    // console.log(authToken);
    success=true;
    res.json({success,authToken});
    }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
    }
    // .then(user => res.json(user)).catch(err => {console.log(err); 
    //     res.json({error:'The value is already exits! Please enter unique value.' ,message:err.message});
    // });
})

//Route 2: authenticate the user No login
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async(req, res)=>{
    //If their is a error return bad request and errors
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password} = req.body;
    try{
        let user = await User.findOne({email : email});
        if(!user){
            success=false;
            return res.status(400).json({success,error: "Please try to login with correct credentials!"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            success=false;
            return res.status(400).json({success,error: "Please try to login with correct credentials!"});
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authToken});
    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    // .then(user => res.json(user)).catch(err => {console.log(err); 
    //     res.json({error:'The value is already exits! Please enter unique value.' ,message:err.message});
    // });
});

//Route 3: Get loggedin user details
router.post('/getuser', fetchuser , async(req, res)=>{
try {
    userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
}})

module.exports = router;