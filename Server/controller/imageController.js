const User = require("../models/userSchema")
const Thumbnail = require("../models/thumbnail")

const sharp = require("sharp")
/* ------------------------------ UPLOAD IMAGE ------------------------------ */

const imageUpload = async (req, res) => {
   console.log(req.user.id)
   const { id } = req.user
   const image = req.file.filename
   console.log("hyyyyyyyyyyy")
   try {
      const result = await User.findByIdAndUpdate(id, { $push: { images: image } })
      console.log(result, "opop")
      generateThumbnails(image, res)
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

const generateThumbnails = async (ogImage, res) => {
   const inputImage = `public/images/${ogImage}`

   const sizes = [
      { width: 200, height: 200 },
      { width: 300, height: 300 },
      { width: 400, height: 400 },
      { width: 500, height: 500 },
   ]

   try {

      const result = await Promise.all( sizes.map((size) => {
         const outputImage = `public/images/${ogImage}-${size.width}x${size.height}.jpg`
         sharp(inputImage)
            .resize(size)
            .toFile(outputImage, async(err, info) => {
               if (err) throw err;
               const datas = {
                  image: outputImage.split('/')[2],
                    width: size.width,
                   height: size.height
               }
               await Thumbnail.findOneAndUpdate({filename:ogImage},{$push:{thumbnails:datas}},{upsert:true})
            })
      }))
      res.status(200).json({message:'image added and Thumbnail generated'})
   } catch (error) {
      res.status(500).json(error.message)
   }


}

const getThumbnails = async(req,res)=>{
   try {
      const images = await Thumbnail.findOne({filename:req.params.id})
      res.status(200).json(images)
   } catch (error) {
      res.status(500).json(error.message)
   }
}
module.exports = { imageUpload, getMyImages, getThumbnails }
