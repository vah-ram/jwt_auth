import React from 'react'

function Contact({ contact, username, getContact, isSelected }) {
  return (
    <div 
      className='w-full h-[60px] flex items-center cursor-pointer bg-[#1c1b1d81] pl-5 gap-4 overflow-hidden'
      onClick={() => {
        getContact(contact)
        isSelected(contact)
      }}>
        <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center'>
            <img src='/Img/user.jpg'/>
        </div>

        <p className='text-sm'>
          {username}
        </p>
    </div>
  )
}

export default Contact