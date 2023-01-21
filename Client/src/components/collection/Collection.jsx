import React, { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import { getImages } from "../../apis/imageApis"

export default function Collection() {

   const [myImages, setMyimages] = useState([])
   const PF = import.meta.env.VITE_IMAGE_URL

   useEffect(() => {
      fetchImages()
      console.log("i runs")
      return () => {}
   }, [])

   const fetchImages = async () => {
      try {
         const { data } = await getImages()
         console.log(data, "called me")
         setMyimages(data.images)
      } catch (error) {
         console.log(error)
         if(error.response.status === 403 || 401){
            navigate('/login')
            localStorage.clear()
          }else{
             alert(error.message)
          }
      }
   }


   return (
      <div className="max-w-full overflow-hidden">
         <div className='flex justify-center my-4 px-16 max-h-screen overflow-y-auto no-scrollbar'>
            <div className='border-b-2 w-full py-2'>
               <h2 className='font-medium text-2xl text-center'>My Collections</h2>
            </div>
         </div>
         <div className='flex flex-wrap -mx-px md:-mx-3 w-screen px-10 '>
            {myImages.length !==0 ?
            <>
             {myImages?.map((image,i) => {
               return(

               <div className='w-1/3  lg:w-1/4 md:px-3  flex justify-center h-[200px] lg:h-[250px]' key={i}>
                  <div className='flex items-center justify-center max-w-xs rounded overflow-hidden shadow-lg m-2 border-2 p-1 scale-95 hover:scale-100 ease-in duration-500'>
                    <Link to={`/thumbnails/${image}`}> <img  className='w-full' src={PF +image} alt='Sunset in the mountains' /></Link>
                  </div>
               </div>
               )
            })}
            </>:
            <div className="w-full">
               <h2 className="text-center font-medium text-red-400">You havent Uploaded any Images!</h2>
               <p className="text-center mt-4 text-blue-400">Go back and start upload images</p>
            </div>
            }
         </div>
      </div>
   )
}
