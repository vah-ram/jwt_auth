import React from 'react'
import { useNavigate } from "react-router-dom"

function MenuBar() {

  const navigate = useNavigate();

  return (
    <div 
      className='w-[100px] h-full bg-[#242227d7] flex flex-col gap-5 
      items-center justify-center max-md:hidden'
      onClick={() => navigate('/register')}>

        <button className='w-[30px] h-[30px] flex justify-center items-center cursor-pointer bg-none border-none outline-none'>
            <img src='/Img/user-icon.png'/>
        </button>

        <button className='w-[30px] h-[30px] flex justify-center items-center cursor-pointer bg-none border-none outline-none'>
            <img src='/Img/moon-icon.png'/>
        </button>

    </div>
  )
}

export default MenuBar