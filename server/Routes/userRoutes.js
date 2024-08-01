const express = require("express");
const router = express.Router();
const User = require("../Models/UserSchema");
const Token = require('../Models/TokenSchema');
const crypto = require('crypto');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verificationEmail = require('../Utils/verifiedEmail');
const authMiddleware = require("../Middlewares/authMiddleware");

// Register Route
router.post("/signup", async (req, res) => {
  try {
    const userExist = await User.findOne({email:req.body.email});
    if(userExist){
      res.json({
        success:false,
        message:"User Exists!"
      })
    }else{
      // Hash Password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password,salt);
      req.body.password = hashedPassword;
      const newUser = await User(req.body);
      await newUser.save();

      // Create token for verification

      const token = await Token({
        userID:newUser._id,
        token:crypto.randomBytes(16).toString('hex')
      });

      await token.save();

      const link = `https://leadtail.onrender.com/api/users/confirm/${token.token}`;

      await verificationEmail(newUser,link);

      res.send({
        success:true,
        message:"User Successfully Registered!",
      })
    }
  } catch (error) {
    res.send({error:error});
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(user && user.verified){
      const validatePassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validatePassword) {
        res.json({
          success: false,
          message: "User doesn't exist, please signup",
        });
      }
  
      const token = jwt.sign({ userID: user._id }, `${process.env.SECRET_KEY}`, {
        expiresIn: "7d",
      });
  
      res.send({
        success: true,
        user: user,
        token: token,
        message: "Welcome back",
      });
    }else{
      res.send({
        success:false,
        message:"Please verify your email to continue!"
      })
    }
    
  } catch (error) {
    res.send(error);
  }
});

// Account Verification Token
router.get('/confirm/:token',async (req,res)=>{
  try {
    const token = await Token.findOne({token:req.params.token});
    // After finding the token, remove the token and update user verified field in User Schema
    await User.updateOne({_id:token.userID},{$set:{verified:true}});
    await Token.findByIdAndDelete(token._id);
    
    // res.send({
    //   success:true,
    //   message:"Email Verification Successful!"
    // })

    res.redirect('http://localhost:5173/login');

  } catch (error) {
    res.send({
      success:false,
      message:error
    })
  }
})

// Token Verification For Session Management
router.get("/get-current-user", authMiddleware, async (req, res) => {
  const user = await User.findById(req.body.userID).select("-password");
  res.send({
    success: true,
    message: "User Authorized",
    data: user,
  });
});

module.exports = router;
