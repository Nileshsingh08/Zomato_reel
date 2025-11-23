const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res){
        const { fullName, email, password }= req.body;

        const isUserAlreadyExist = await userModel.findOne({email})

        if(isUserAlreadyExist){
            return res.status(400).json({
                message: "User already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = userModel.create({
            fullName,
            email,
            password: hashedPassword
        })

    const token = jwt.sign({id: user._id,},process.env.JWT_SECRET)
    res.cookie("token", token)
    res.status(201).json({
        message: "User registered successfully",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

async function loginUser(req, res) {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token)
    res.status(201).json({
        message: "User logged in successfully",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

function logoutUser (req,res){
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}

async function registerFoodPartner(req,res){
    console.log("Request body:", req.body);  // 👈 check what’s inside
    const {businessName, contactName, email, password, phone, address} = req.body;
    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email
    })
    if (isAccountAlreadyExists){
        return res.status(400).json({
            message: "Food partner account already exist"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const foodPartner = await foodPartnerModel.create({
            businessName,
            contactName,
            phone,
            address,
            email,
            password: hashedPassword
    })
    const token = jwt.sign({
        id: foodPartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "Food partner registered successfully",
        foodPartner:{
            _id: foodPartner._id,
            email: foodPartner.email,
            name: foodPartner.name
        }
    })
    

}


async function loginFoodPartner(req,res) {
    const {email, password} = req.body;
    const user = await foodPartnerModel.findOne({email});
    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }
    const token = jwt.sign({
        id: user._id,
    },process.env.JWT_SECRET)

    res.cookie("token", token)
    res.status(201).json({
        message: "User logged in successfully",
        user:{
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
    
}

function logoutFoodPartner (req,res){
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    });
}

module.exports = { registerUser, loginUser,logoutUser,registerFoodPartner,loginFoodPartner,logoutFoodPartner };