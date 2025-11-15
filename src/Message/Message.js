import { useState, useRef, useEffect } from "react";
import { messageSendHost, messageGetHost } from "../utils/Hosts.js";
import axios from "axios";
import io from "socket.io-client";
import { host } from "../utils/Hosts.js";

const socket = io.connect(host);

function Message({ contact, currentUser }) {
  const messageScroll = useRef(null);
  const sendSoundRef = useRef(null);

  const [ selectedChat, setSelectedChat ] = useState('nll');
  const [ messageValue, setMessageValue ] = useState('');
  const [ messages, setMessages ] = useState([]);

  useEffect(() => {
    messageScroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  useEffect(() => {
    setSelectedChat('');
  }, []);

  useEffect(() => {
    if(contact) {
      setSelectedChat(true)
    };
  }, [contact]);

  useEffect(() => {
    const getMessagesFunc = async() => {
      const res = await axios.get(messageGetHost, {
        params: { myId: currentUser?._id, contactId: contact?._id }
      });

      if(res.data.status) {
        setMessages(res.data.messages)
      } else {
        setMessages([])
      }
    };

    getMessagesFunc();

    socket.on("receive_message", getMessagesFunc);

    return () => socket.off("receive_message", getMessagesFunc);

  }, [contact, selectedChat]);

    const sendMessage = async(evt) => {
      evt.preventDefault();

      if(currentUser && contact) {
        if(messageValue) {
          const res = await axios.post(messageSendHost, {
            from: currentUser?._id,
            to: contact?._id,
            message: messageValue
          });

          if(res.status) {
            setMessageValue('')
          };
        };
      }

      socket.emit("send_message");
      sendSoundRef.current.play();
    };

  return (
    <div 
      className={
        `w-[60%] h-full relative flex flex-col justify-center items-center bg-[linear-gradient(0deg,#242227c6,#2c2b2fd7)] ${contact ? "max-md:w-full" : "max-md:hidden"}`
        }>
        {
          selectedChat 
          ?
          <>
            <header className="w-full h-[70px] pl-5 pr-5 absolute top-0 flex items-center">
              <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
                <img alt="" src="/Img/user.jpg" className="w-full h-full"/>
              </div>
              
              <p className="text-white font-sans ml-3">
                {contact?.username}
              </p>
            </header>

            <div 
              className="w-full h-[calc(100%-140px)] overflow-y-auto absolute top-[70px] flex flex-col gap-3 p-5"
              id="messages__part">
             
              {
                messages
                ?
                messages.map((e,i) => {
                  if(e.from === currentUser._id) {
                    return (
                      <div 
                        className="px-3 py-2 rounded-lg 
                        rounded-br-[0px]  bg-[#832ab0ff]
                         ml-auto text-white text-sm font-sans">
                        {e.message}
                      </div>
                    )
                  } else {
                    return (
                      <div 
                        className="px-3 py-2 rounded-lg rounded-bl-[0px]  bg-gray-500 mr-auto text-white text-sm font-sans">
                        {e.message}
                      </div>
                    )
                  }
                })
                :
                ''
              }

              <div ref={messageScroll}/>

            </div>

            <div className="w-full h-[70px] absolute bottom-0 flex items-center justify-center">
              <form 
                className='w-[70%] h-[50px] flex items-center justify-between pl-5 rounded-md bg-[#28272a81] border-1 border-[#7b7b7bb0]'
                onSubmit={sendMessage}>
                  <input 
                      type="text"
                      className='bg-transparent w-[calc(100%-35px-20px)] outline-none border-none text-sm text-white'
                      placeholder='Написать сообщения'
                      value={messageValue}
                      onChange={e => setMessageValue(e.target.value)}/>
                  <button 
                          type="submit"
                          className='w-[35px] h-full cursor-pointer'>
                      <img 
                          src='/Img/send-icon.png'
                          className='cursor-pointer w-[20px] h-[20px]'
                          alt=""/>
                  </button>
              </form>
            </div>
          </>
          :
          <>
            <img 
            src='/Gif/typing-gif.gif' 
            width={200} 
            height={200} 
            style={{ borderRadius: "5px" }}
            alt='Gif'
            className="max-md:hidden"/>

            <p className='text-white font-sans text-sm mt-2 max-md:hidden'>
              Выберите чат, чтобы начать перепысоваться
            </p>
          </>
        }

        <audio src="/audio/send-audio.mp3" ref={sendSoundRef}/>
    </div>
  )
}

export default Message