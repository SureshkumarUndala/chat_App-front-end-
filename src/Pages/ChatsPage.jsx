import { Box } from '@mui/material'
import React from 'react'
import SideDrawer from "./../components/miscallaneous/SideDrawer"
 const ChatsPage = () => {


  return (
    <div style={{width:"98.5%"}}>
      <SideDrawer/>
      <Box>
        {/* {user && <MyChats/>} 
        {user && <ChatBox/>} */}
      </Box>
    </div>
  )
}

export default ChatsPage