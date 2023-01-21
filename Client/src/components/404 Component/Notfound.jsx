import React from "react"
import notFound from '../../assets/404.jpg'
import { useNavigate } from 'react-router-dom'
export default function Notfound() {
    const navigate = useNavigate()
   return (
      <div className='flex items-center justify-center'>
         <div className='3/4 h-screen flex'>
            <div className="h-full w-1/2 flex items-center">
                <div>
               <h2 className="text-6xl font-bold text-blue-800">Not found</h2>
               <p className="mt-4 text-blue-400">Page you are looking for is not found</p>
               <button onClick={()=>navigate(-1,{replace:true})} className="bg-blue-600 text-white rounded-md p-2 m-2">Take me Back</button>
                </div>
            </div>
            <div className="w-3/4 h-full">
                <img className="w-full h-full" src={notFound} alt="" />
            </div>
         </div>
      </div>
   )
}
