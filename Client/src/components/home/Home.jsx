import React,{useState} from "react"
import homeBg from '../../assets/home-bg.jpg'
import AddImage from "../modals/AddImage"
export default function Home() {

    const [open,setOpen]=useState(false)

   return (
    <>
        <div className="md:flex w-screen">
            <div className="md:w-1/2 flex items-center justify-center h-screen">
                <div className="mt-8">
                <h2 className="font-bold text-2xl my-2 text-blue-800">Welcome to Image store</h2>
                <div className="my-2 text-blue-500 font-sans text-lg">
                <p className="">We will build you thumbails for your images </p>
                <p className="">Upload your images now</p>
                </div>
                <button onClick={()=>setOpen(true)} className="bg-blue-500 rounded-md p-2 text-white">Add image</button>
                </div>
            </div>
            <div className="md:w-3/4 h-screen">
                <img src={homeBg} alt="bg-home" />
            </div>
        </div>
        {open ?<AddImage setOpen={setOpen}/>:''}
    </>
   )
}
