import { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Toaster, toast } from "sonner"
import { registerHost } from "../utils/Hosts.js"

function Register() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(null);

  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [correctPassword,setCorrectPassword] = useState('');

  const addValues = async(evt) => {
    evt.preventDefault();
    
    if(!username || !email || !password || !correctPassword) {
        return;
    };

    if(password === correctPassword) {
        try {
            const res = await axios.post(registerHost, {
                    username: username,
                    email: email,
                    password: password
                });

            if(res.data.status) {
                localStorage.setItem("Chat-user", JSON.stringify(res.data.user))
                navigate('/')
            } else {
                toast.error(res.data.msg, {
                    position: "bottom-right",
                    duration: 3000
                });
            }

            } catch(err) {
                console.error(err)
            }
    } else {
        toast.error("Your password and correct password must be same!!!", {
            position: "bottom-right",
            duration: 3000
        });
    };

  };

  return (
   <div className="w-full h-[100vh] flex justify-center items-center">

        <form 
            className="w-[20rem] max-md:w-[70%] max-sm:w-[90%] h-auto flex flex-col items-center"
            onSubmit={addValues}>
            <h1 className="font-bold mr-auto text-xl text-gray-800">
                Create your account
            </h1>

            <p 
                className="flex mr-auto mt-3  gap-2 font-bold font-sans text-sm text-gray-800">
                    Already have an account 
                <a 
                    href="/login" className="text-purple-700">
                        Log in
                </a>
            </p>

            <label 
                for="username" className="mr-auto mt-5 text-gray-700 text-sm">
                * Username
            </label>
                <div 
                    className="p-2 w-[100%]  rounded-md border border-1 border-gray-700 mt-2">
                    <input 
                        type="text" 
                        id="username"
                        className="outline-none border-none w-full"
                        onChange={e => setUsername(e.target.value)}/>
                </div>
            
            <label 
                for="email" className="mr-auto mt-3 text-gray-700 text-sm">
                * E-mail
            </label>
                <div className="p-2 w-[100%] rounded-md border border-1 border-gray-700 mt-2">
                    <input 
                        type="email" 
                        id="email"
                        className="outline-none border-none w-full"
                        onChange={e => setEmail(e.target.value)}/>
                </div>
            
            <label 
                for="password" className="mr-auto mt-3 text-gray-700 text-sm">
                * Password
            </label>
                <div className="p-2 w-[100%] rounded-md border border-1 border-gray-700 mt-2">
                    <input 
                        type="password" 
                        id="password" 
                        className="outline-none border-none w-[90%]"
                        onChange={e => setPassword(e.target.value)}/>
                </div>
            
            <label 
                for="correctpassword" className="mr-auto mt-3 text-gray-700 text-sm">
                * Correct Password
            </label>
                <div className="p-2 w-[100%] rounded-md border border-1 border-gray-700 mt-2">
                    <input 
                        type="password" 
                        id="correctpassword" 
                        className="outline-none border-none w-[90%]"
                        onChange={e => setCorrectPassword(e.target.value)}/>
                </div>

            <div 
                className="flex gap-2 mr-auto mt-3 cursor-pointer" 
                onClick={() => {
                    setLoggedIn(!loggedIn)
                }}>

                <input 
                    type="checkbox" 
                    checked={loggedIn}
                    className="cursor-pointer"/>

                    <p className="text-sm text-gray-800">
                        Keep me logged in
                    </p>

            </div>

            <button 
                type="submit" 
                className="w-[90%] h-[50px] mt-[25px] cursor-pointer text-white font-bold rounded-md bg-purple-700 border-none"
                onSubmit={addValues}>
                Create account
            </button>
        </form>

        <Toaster richColors/>
    </div>
  )
}

export default Register