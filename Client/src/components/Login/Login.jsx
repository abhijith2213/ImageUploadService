import React,{useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useDispatch } from "react-redux"
import { loginUser } from "../../redux/authSlice"

const schema = yup.object({
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
})

export default function Login() {

   const [error,setErrors ] = useState('')

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ resolver: yupResolver(schema) })

   const onSubmit =async (data) => {
      setErrors('')
   const {payload} = await dispatch(loginUser(data))
   if(payload){
      navigate('/')
   }else{
      setErrors('invalid login credentials')
   }

   }
   return (
      <div className='bg-auth-bg bg-cover min-h-screen flex flex-col'>
         <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
            <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
               <h1 className='mb-8 text-3xl text-center font-medium text-blue-400'>Log in</h1>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                     type='email'
                     className={`block border border-grey-light w-full p-3 rounded  ${
                        errors?.email?.message ? `focus:outline-red-300` : `focus:outline-green-300`
                     } `}
                     {...register("email")}
                     placeholder='Email'
                  />
                  <p className='mb-4 text-red-400 text-sm ml-2'>{errors?.email?.message}</p>
                  <input
                     type='password'
                     className={`block border border-grey-light w-full p-3 rounded  ${
                        errors?.password?.message ? `focus:outline-red-300` : `focus:outline-green-300`
                     } `}
                     {...register("password")}
                     placeholder='Password'
                  />
                  <p className='mb-4 text-red-400 text-sm ml-2'>{errors?.password?.message}</p>
                  <button
                     type='submit'
                     className='w-full text-center py-3 rounded bg-green bg-blue-600 text-white hover:bg-green-dark focus:outline-none my-1'
                  >
                     Login
                  </button>
               </form>
               <p className='mb-4 text-red-400 text-sm ml-2'>{error}</p>
               <div className='text-grey-dark mt-6 text-center'>
                  Don't have an account?
                  <Link to={"/signup"}>
                     <p className=' text-blue-400 cursor-pointer border-blue text-blue'>Sign up</p>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}
