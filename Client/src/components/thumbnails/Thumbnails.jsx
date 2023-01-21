import React from "react";
import { useParams} from 'react-router'



export default function Thumbnails() {
  const PF = import.meta.env.VITE_IMAGE_URL


  const {image } = useParams()
  
  return (
    <div className="m-6">
    <div className="flex lg:flex-row flex-col items-center gap-4">
      <div className="lg:w-1/3">
           <img className="w-[200px] h-[200px]" src={PF+image} alt="" />
           <p className="p-2">Size: 200px X 200px</p>
      </div>
      <div className="lg:w-1/3">
           <img className="w-[300px] h-[300px]" src={PF+image} alt="" />
           <p className="p-2">Size: 300px X 300px</p>
      </div>
      <div className="lg:w-1/3">
           <img className="w-[400px] h-[400px]" src={PF+image} alt="" />
           <p className="p-2">Size: 400px X 400px</p>
      </div>
    </div>
    </div>
  )
}
