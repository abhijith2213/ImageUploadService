import React from "react";
import { Outlet ,useNavigate} from 'react-router-dom'
import NavBar from "../../components/navBar/NavBar";

export default function UserPage() {
  return (
    <section className="">
    <NavBar/>
    <Outlet/>
</section>
  )
}
