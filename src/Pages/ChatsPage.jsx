import { Box } from '@mui/material'
import React from 'react'
import SideDrawer from "./../components/miscallaneous/SideDrawer"
import Mychats from '../components/miscallaneous/Mychats'
import { ChatState } from '../context/ChatProvider'
import ChatBox from '../components/miscallaneous/ChatBox'


const ChatsPage = () => {

  const { user } = ChatState()

  return (
    <Box style={{ width: "98.5%" }}>
      <SideDrawer />
     <Box display="flex" > 
      {user && <Mychats/>}
         {user && <ChatBox/>}
      </Box>
       
 

    </Box>
  )
}

export default ChatsPage