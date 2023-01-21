const express = require("express")
const { imageUpload, getMyImages } = require("../controller/imageController")
const verifyApi = require("../middlewares/jwtAuth")
const upload = require("../config/multer")
const router = express.Router()

router.put('/upload',verifyApi,upload.single('file'),imageUpload)

router.get('/myImages',verifyApi, getMyImages)

router.get('/thumbnails')

module.exports = router
