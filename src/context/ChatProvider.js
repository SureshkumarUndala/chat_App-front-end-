import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
const ChatContext = createContext()

const ChatProvider = ({children})=>{
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [selectedChats, setSelectedChats] = useState()
    const [chats, setChats] = useState()   // for accessing chating msgs from users
    
    useEffect(()=>{
      const userInfo = JSON.parse(localStorage.getItem("user_Info"))
    
      setUser(userInfo)
      if(!userInfo){
        navigate("/")
      }
    },[navigate])

    return <ChatContext.Provider value={{user,setUser, selectedChats, setSelectedChats, chats, setChats}}>
         {children}
       </ChatContext.Provider>
}

export const ChatState = ()=>{
    return useContext(ChatContext)

}
export default ChatProvider