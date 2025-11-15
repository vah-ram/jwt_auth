import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { loginHost } from "../utils/Hosts.js"
import axios from 'axios';
import { Toaster, toast } from "sonner"

function Login() {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(null);

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const logInAccount = async(evt) => {
    evt.preventDefault();

    if(!email || !password) {
        return
    };

    try {
        const res = await axios.post(loginHost, {
            email: email,
            password: password
        });

        if(res.data.status) {
            localStorage.setItem("Chat-user", JSON.stringify(res.data.user))
            navigate('/');
        } else {
            toast.error(res.data.msg, {
                position: "bottom-right",
                duration: 3000
            });
        }
    } catch(err) {
        console.error(err)
    }

  }

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
        <form 
            className="w-[20rem] max-md:w-[70%] max-sm:w-[90%] h-auto flex flex-col items-center"
            onSubmit={logInAccount}>

            <h1 className="font-bold mr-auto text-xl text-gray-800">
                Log in your account
            </h1>

            <p 
                className="flex mr-auto mt-3  gap-2 font-bold font-sans text-sm text-gray-800">
                    Don`t have an account 
                <a 
                    href="/register" className="text-purple-700">
                        Register
                </a>
            </p>
            
            <label 
                for="email" className="mr-auto mt-5 text-gray-700 text-sm">
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

            <div 
                className="flex gap-2 mr-auto mt-3 cursor-pointer" 
                onClick={() => {
                    setLoggedIn(!loggedIn)
                }}>

                <input 
                    type="checkbox" 
                    checked={loggedIn}
                    className="cursor-pointer" />

                    <p className="text-sm text-gray-800">
                        Keep me logged in
                    </p>

            </div>

            <button 
                type="submit" 
                className="w-[90%] h-[50px] mt-5 cursor-pointer text-white font-bold rounded-md bg-purple-700 border-none"
                onSubmit={logInAccount}>
                Log in
            </button>
        </form>

        <Toaster richColors/>
    </div>
  )
}

export default Login