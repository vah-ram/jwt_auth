import { useState } from 'react';
import Contact from './Contact';
import axios from "axios";
import { searchHost } from "../utils/Hosts.js"

function Chats({ getContact, currentUser }) {

    const [ users, setUsers ] = useState([]);
    const [ contact, setContact ] = useState();

    const searchUser = async(text) => {
        
        if(text.length > 0) {
            try {
                const res = await axios.get(searchHost, {
                    params: { value: text }
                });

                if(res.data.status) {
                    setUsers(res.data.users)
                } else {
                    return;
                }

            } catch(err) {
                console.error(err);
            };
        }

    };

    const isSelected = (user) => {
        setContact(user)
    }

  return (
    <div className={
        `w-[calc(40%-100px)] max-md:w-[40%] max-md:p-2 
        ${contact ? "max-md:hidden" : "max-md:w-full p-[30px]"}
         h-full text-white flex flex-col p-10 bg-[#242227c6]`
    }>
        <div className='w-full flex justify-between'>
            <h2 className='font-bold text-white font-sans text-xl'>
                {currentUser?.username}
            </h2>

            <button className='cursor-pointer border-none outline-none bg-none'>
                <img 
                    src='/Img/edit-icon.png'
                    className='w-[20px] h-[20px]'
                    alt=''/>
            </button>
        </div>

        <form 
            className='w-full h-[40px] flex items-center justify-between pl-5 mt-[25px] rounded-md bg-[#28272a81] border-1 border-[#7b7b7bb0]'
            onSubmit={(evt) => {
                evt.preventDefault()
            }}>
            <input 
                type="text"
                className='bg-transparent w-[85%] outline-none border-none text-sm'
                placeholder='Найти людей'
                onChange={(e) => {
                    searchUser(e.target.value)
                }}/>
            <button 
                className='w-[30px] h-full cursor-pointer'
                type='submit'>
                <img 
                    src='/Img/search-icon.png'
                    className='cursor-pointer w-[15px] h-[15px]'
                    alt=''/>
            </button>
        </form>

        <div className='w-full h-auto flex flex-col mt-5 rounded-md overflow-y-auto'>
            {
                users
                ?
                users.map((e, i) => {
                    return (
                        <Contact 
                            contact={e}
                            username={e.username} 
                            contactId={e._id} 
                            id={i}
                            getContact={getContact}
                            isSelected={isSelected}/>
                    )
                })
                :
                ''
            }
        </div>
    </div>
  )
}

export default Chats