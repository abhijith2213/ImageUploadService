import React,{useState} from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { signup } from "../../apis/userAuth"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const schema = yup.object({
   fullName: yup
      .string()
      .required()
      .matches(/^([a-zA-Z]{3,12})+(?:\s[a-zA-Z]{1,8})+$/, "Full name required!"),
   email: yup
      .string()
      .required()
      .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Provide a valid mail id"),
   password: yup
      .string()
      .required()
      .matches(
         /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/,
         "Password must be combination of letters and numbers only & in between 8 - 15 letters"
      ),
   confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords does not match"),
})

export default function Signup() {

   const [request,setrequest] = useState(false)
   const [error, setError] = useState('')

   const navigate = useNavigate()
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: yupResolver(schema) })

   const onSubmit = async (formData) => {
      console.log(formData, "signup datas")
      setrequest(true)
      try {
         const { data } = await signup(formData)
         toast.success(data.message +'\n navigating to login..')
         setTimeout(() => {
            navigate('/login')
         }, 2000)
      } catch (error) {
         setrequest(false)
         if (error?.response?.status === 403) {
            const { data } = error?.response
            // alert(data?.message)
            setError(data?.message)
            setTimeout(() => {
               setError('')
            },5000);
         } else {
            alert("something went wrong, try again")
         }
      }
   }

   return (
      <div className='bg-auth-bg bg-cover min-h-screen flex flex-col'>
         <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
            <div className='bg-zinc-50 px-6 py-8 rounded shadow-md text-black w-full'>
               <h1 className='mb-8 text-3xl text-center font-medium text-blue-400'>Sign up</h1>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                     type='text'
                     className={`block border border-grey-light w-full p-3 rounded  ${
                        errors.fullName?.message ? `focus:outline-red-300` : `focus:outline-green-300`
                     } `}
                     {...register("fullName")}
                     placeholder='Full Name'
                  />
                  <p className='mb-4 ml-2 text-red-400 text-sm'>{errors.fullName?.message}</p>
                  <input
                     type='email'
                     className={`block border border-grey-light w-full p-3 rounded  ${
                        errors.email?.message ? `focus:outline-red-300` : `focus:outline-green-300`
                     } `}
                     {...register("email")}
                     placeholder='Email'
                  />
                  <p className='mb-4 text-red-400 text-sm ml-2'>{errors.email?.message}</p>
                  <input
                     type='password'
                     className={`block border border-grey-light w-full p-3 rounded  ${
                        errors.password?.message ? `focus:outline-red-300` : `focus:outline-green-300`
                     } `}
                     {...register("password")}
                     placeholder='Password'
                  />
                  <p className='mb-4 text-red-400 text-sm ml-2'>{errors.password?.message}</p>
                  <input
                     type='password'
                     className={`block border border-grey-light w-full p-3 rounded  ${
                        errors.confirmPassword?.message ? `focus:outline-red-300` : `focus:outline-green-300`
                     }`}
                     {...register("confirmPassword")}
                     placeholder='Confirm Password'
                  />
                  <p className='mb-4 text-red-400 text-sm ml-2'>{errors.confirmPassword?.message}</p>
                  <button
                     disabled={request}
                     type='submit'
                     className='w-full text-center py-3 rounded bg-green disabled:bg-blue-200 bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1'
                  >
                     Create Account
                  </button>
               </form>
               <p className='mb-4 text-red-400 text-sm ml-2'>{error}</p>
               <div className='text-grey-dark mt-6 text-center'>
                  Already have an account?
                  <Link to={"/login"}>
                     <p className=' border-blue text-blue-400 cursor-pointer'>Log in</p>
                  </Link>
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
