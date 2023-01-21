const express = require("express")
const router = express.Router()
const { postSignup, postLogin, getRefreshToken } = require("../controller/userAuthController")
const verifyApi = require("../middlewares/jwtAuth")


router.post("/signup",postSignup)

router.post('/login',postLogin)

router.post('/refresh',getRefreshToken)

// router.post('/logout',verifyApi,postLogout)

module.exports = router
