import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header' 
function Userroot() {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}
export default Userroot