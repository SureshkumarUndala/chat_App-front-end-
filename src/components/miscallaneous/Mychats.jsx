import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import axios from "axios"
import { Box, Button, Snackbar, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ChatLoading from './ChatLoading';
import { getSender } from '../../config/GetsenderName';
import GroupChatModel from './GroupChatModel';
const Mychats = () => {

  const { selectedChats, setSelectedChats, chats, setChats, user } = ChatState()
  const [loggedUser, setLoggedUser] = useState()
  const [alert, setAlert] = useState({ open: false, message: "" })

  const fetchChats = async () => {


    try {
      // getting all chats
      const { data } = await axios.get("http://localhost:8080/api/v1/chat", {
        headers: {
          Authorization: `Bearer ${user.user.token}`
        }
      })
      // console.log(chats)
      // console.log(data.chats)
      setChats(data.chats)

    }
    catch (err) {
      console.log(err)
      setAlert({
        ...alert, open: true, message: err.response.data.error
      })

    }

  }

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user_Info")))
    fetchChats()
  }, [])

  const handleClose = () => {
    setAlert({ ...alert, open: false, message: "" })
  }

  return (
    <Box flexDirection="column"
      alignItems="center"
      m={2}
      p={3}
      bgcolor="white"
      width="33%"
      borderRadius="8px"
      minHeight="79vh"
    >
      <Box
        display="flex"
        justifyContent="space-between">
        <Typography variant='h5'>My Chats</Typography>
        <GroupChatModel>
          <Button
            variant='contained' color="inherit" endIcon={<AddIcon />}>New Group Chat
          </Button>
        </GroupChatModel>
      </Box>
      <Stack >


        {chats?.length > 0 ? chats.map((chat) => (

          <Box
            cursor="pointer"
            onClick={() => setSelectedChats(chat)}
            bgcolor={selectedChats === chat ? "blue" : "#1b5e20"}
            color={selectedChats === chat ? "white" : "lightgrey"}
            px={3}
            py={2}
            m={2}
            borderRadius="8px"
            key={chat._id}
          >

            <Typography variant='h6' >

              {chat.isgroupchat ? chat.chatName : getSender(loggedUser.user, chat.users)}
            </Typography>

          </Box>
        )) : null}

      </Stack>




      <Snackbar
        open={alert.open}
        message={alert.message}
        autoHideDuration={5000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"

        }}
        onClose={handleClose}
      >

      </Snackbar>
    </Box>
  )
}

export default Mychats