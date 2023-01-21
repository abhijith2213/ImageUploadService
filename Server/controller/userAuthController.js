const bcrypt = require("bcrypt")
const User = require("../models/userSchema")
const jwt = require('jsonwebtoken')

/* ----------------------------- CREATE ACCOUNT ----------------------------- */

const postSignup = async (req, res) => {
   console.log(req.body)
   try {
      let { fullName, email, password } = req.body
      const user = await User.findOne({email})
      console.log(user);
      if(!user){
          password = await bcrypt.hash(password, 10)
           User.create({
             fullName,
             email,
             password,
          }).then((response) => {
             res.status(200).json({message:'Account created successfully'})
          })
      }else{
        res.status(403).json({message:'email already registered!'})
      }
   } catch (error) {
      console.log(error)
      res.status(500).json(error.message)
   }
}

/* ---------------------- Function to generate a tokens ---------------------- */

const generateAccessToken =(user)=>{
    return jwt.sign({id:user},process.env.JWTSECRET,{expiresIn:'30s'});
}

const generateRefreshToken =(user)=>{
    return jwt.sign({id:user},process.env.JWT_REFRESHSECRET);
}

/* ------------------------- REFRESH TOKEN GENERATE ------------------------- */

const getRefreshToken = async (req,res)=>{

    const refreshToken = req.body.token;
    console.log(refreshToken,'its me refresh in body');
    if(!refreshToken){
        return res.status(401).json({message:'You are not authenticated!'})
    }

    jwt.verify(refreshToken,process.env.JWT_REFRESHSECRET,(err,user)=>{
        err && console.log(err)


        const newAccessToken = generateAccessToken(user.id)

        res.status(200).json({accessToken:newAccessToken})

    })
}

 /* ------------------------------- USER LOGIN ------------------------------- */

 const postLogin = async (req,res)=>{
     console.log(req.body);
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email})
        console.log(user,'login user');
        if(user){
            const pass = await bcrypt.compare(password,user.password)
            if(pass){
                const accessToken = generateAccessToken(user._id)
                const refToken = generateRefreshToken(user._id)
                // await User.findByIdAndUpdate(user._id,{$set:{refreshToken:refToken}})
                const {password,images,...userData} = user._doc
                res.status(200).json({msg:'Login success',user:userData,accessToken,refreshToken:refToken})
            }else{
                res.status(401).json({error:'incorrect password'})
            }
        }else{
            res.status(404).json({error:'user not found'})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

/* ------------------------------- LOGOUT USER ------------------------------ */





module.exports = { postSignup ,postLogin,getRefreshToken}
