const express = require("express")
const router = express.Router()
const verifyApi = require("../middlewares/jwtAuth")
const upload = require("../config/multer")
const { imageUpload, getMyImages, getThumbnails } = require("../controller/imageController")

router.put('/upload',verifyApi,upload.single('file'),imageUpload)

router.get('/myImages',verifyApi, getMyImages)

router.get('/thumbnails/:id',getThumbnails)

module.exports = router
