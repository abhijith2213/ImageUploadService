import React,{useState} from "react"
import { uploadImage } from "../../apis/imageApis"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router"

export default function AddImage({ setOpen }) {

    const [image, setImage] = useState('')
    const [showImage, setShowImage] = useState('')
      const navigate = useNavigate()
    const handleImage = (e) => {
        setShowImage(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
     }

     const handleUpload=async(e)=>{
        e.preventDefault()
        try {
         if(image){
            const {data} = await uploadImage({file:image})
            console.log(data);
            toast.success(data.message)
            setOpen(false)
        }
        } catch (error) {
           if(error.response.status === 403 || 401){
              navigate('/login')
              localStorage.clear()
            }else{
               alert(error.message)
            }
        }

     }
   return (
      <div className='relative z-10' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
         <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'></div>

         <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
               <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                  <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                     <div className='flex items-center justify-center w-full'>
        
                        {showImage ? (
                           <span>
                              <img src={showImage} alt='' className='relative h-[300px]' />
                           </span>
                        ) :
                        <label
                        htmlFor='dropzone-file'
                        className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 '
                     >
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                           <svg
                              aria-hidden='true'
                              className='w-10 h-10 mb-3 text-gray-400'
                              fill='none'
                              stroke='currentColor'
                              viewBox='0 0 24 24'
                              xmlns='http://www.w3.org/2000/svg'
                           >
                              <path
                                 strokeLinecap='round'
                                 strokeLinejoin='round'
                                 strokeWidth={2}
                                 d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                              />
                           </svg>
                           <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                              <span className='font-semibold'>Click to upload</span>
                           </p>
                           <p className='text-xs text-gray-500 dark:text-gray-400'>
                              SVG, PNG, JPG only choose images
                           </p>
                        </div>
                        <input onChange={handleImage} id='dropzone-file' type='file'  accept='image/*' className='hidden' />
                     </label> 
                        }
                     </div>
                  </div>
                  <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                     <button
                     onClick={handleUpload}
                        type='button'
                        className='inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                     >
                        Upload
                     </button>
                     <button
                        onClick={() => setOpen(false)}
                        type='button'
                        className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                     >
                        Cancel
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <ToastContainer
            position='top-center'
            autoClose={3000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
            theme='dark'
         />
      </div>
   )
}
