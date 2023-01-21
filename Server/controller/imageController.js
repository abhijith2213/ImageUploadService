const User = require("../models/userSchema")

/* ------------------------------ UPLOAD IMAGE ------------------------------ */

const imageUpload = async (req, res) => {
   console.log(req.user.id)
   const { id } = req.user
   const image = req.file.filename
   console.log("hyyyyyyyyyyy")
   try {
      const result = await User.findByIdAndUpdate(id, { $push: { images: image } })
      console.log(result, "opop")
      generateThumbnails(res, image)
   } catch (error) {
      res.status(500).json(error.message)
   }
  
}

/* ----------------------------- GET USER IMAGES ---------------------------- */

const getMyImages = async (req, res) => {
   try {
      const { id } = req.user
      const images = await User.findById(id, { images: 1 })
      console.log(images, "its images")
      res.status(200).json(images)
   } catch (error) {
      res.status(500).json(error.message)
   }
}

module.exports = { imageUpload, getMyImages }
