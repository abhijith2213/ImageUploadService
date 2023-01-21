import React,{useState} from "react"
import { Link } from "react-router-dom"
import {BiLogOutCircle} from 'react-icons/bi'
import LogoutModal from "../modals/LogoutModal"

export default function NavBar() {

const [modal,setModal] = useState(false)

   return (
    <div className="maxfull overflow-hidden">

        <div className="flex flex-wrap place-items-center">
          <section className="relative mx-auto">
            {/* navbar */}
            <nav className="flex justify-between bg-gray-900 text-white w-screen">
              <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                <a className="text-3xl font-bold font-heading" >
                  Logo Here.
                </a>
                {/* Nav Links */}
                <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                  <li><Link to={'/'}><p className="hover:text-gray-200">Home</p></Link></li>
                  <li><Link to={'/collection'}><p className="hover:text-gray-200">Collection</p></Link></li>

                </ul>
                {/* Header Icons */}
                <div className="hidden xl:flex space-x-5 items-center">
                  <a className="hover:text-gray-200" >
                      <BiLogOutCircle onClick={()=>setModal(true)} className="text-2xl cursor-pointer"/>
                  </a>

                  {/* Sign In / Register      */}
                  <a className="flex items-center hover:text-gray-200" >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </a>
                </div>
              </div>
              {/* Responsive navbar */}
              <a className="navbar-burger self-center mr-12 xl:hidden" >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </a>
            </nav>
          </section>
        </div>
        {modal ? <LogoutModal setModal={setModal}/> : null}
      </div>
   )
}
