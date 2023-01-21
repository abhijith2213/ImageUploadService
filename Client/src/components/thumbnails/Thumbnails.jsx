import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import { getThumbnails } from "../../apis/imageApis"

export default function Thumbnails() {
   const [images, setImages] = useState({})
   const PF = import.meta.env.VITE_IMAGE_URL
   const { image } = useParams()

   useEffect(() => {
      fetchThumbnails()
      return () => {}
   }, [])

   const fetchThumbnails = async () => {
      const { data } = await getThumbnails(image)
      console.log(data, "tdataaa")
      setImages(data)
   }

   return (
      <div className='m-6'>
        <h2 className="text-center font-bold text-2xl">Thumbnails</h2>
         <div className='flex lg:flex-row flex-col items-center gap-4'>
            {images?.thumbnails?.map((image) => {
               return (
                  <div className=''>
                     <div className='flex justify-center rounded overflow-hidden shadow-lg m-2 border-2 p-1 scale-95 hover:scale-100 ease-in duration-500'>
                        <img className='' src={PF + image.image} alt='' />
                     </div>
                     <p className='p-2 text-center text-lime-700 font-medium'>
                        Size: {image.width}px X {image.height}px
                     </p>
                  </div>
               )
            })}
         </div>
      </div>
   )
}
