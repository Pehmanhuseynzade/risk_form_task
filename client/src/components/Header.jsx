import React from 'react'
import "../Pages/User/user.scss"
import {Link} from "react-router-dom"
function Header() {
  return (
    <>
    <header>
        <p>Sign Up!</p>
        <Link to='/admin'><button className='admin-btn'>Admin button</button></Link>
    </header>
    </>
  )
}

export default Header