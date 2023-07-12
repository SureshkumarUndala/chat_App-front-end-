import { Alert, Avatar, Box, Button, Drawer, Menu, MenuItem, Skeleton, Snackbar, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItems from './UserListItems';

const SideDrawer = () => {
  const { user,selectedChats, setSelectedChats, chats, setChats  } = ChatState()

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([])
  const [anchorEl, setAnChorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [isDrawopen, setisDrawopen] = useState(false)
  const Navigate = useNavigate()
  const [alert, setAlert] = useState({ open: false, message: "" })
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState(false)



  const closeHandler = () => {
    setAnChorEl(null)
    setOpen(false)

  }

  const clickHandler = (e) => {
    setOpen(true)
    setAnChorEl(e.currentTarget)
  }
  const logoutHandler = () => {
    localStorage.removeItem("user_Info")
    Navigate("/")
  }
  const handleClose = () => {
    setAlert({ ...alert, open: false })

  }
  const accesschat = async(userId) =>{
    setLoadingChat(true)
    try {
      setLoading(true)
      const { data } = await axios.post(`http://localhost:8080/api/v1/chat`, {userId}, {
        headers: {
          Authorization: "Bearer " + user?.user?.token
        }
      })
      setSelectedChats(data)
      setLoadingChat(false)
   
    }
    catch (err) {
      setAlert({
        ...alert,
        open: true,
        message: "Error Fetching Data"
      })
    }

  


  }

  const searchHandler = async () => {
    if (!search) {
      setAlert({ ...alert, open: true, message: "please Enter Something in Search" })
      return


    }
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:8080/api/v1/users/?search=${search}`, {
        headers: {
          Authorization: "Bearer " + user?.user?.token
        }
      })
      setLoading(false)
      setSearchResult(data)
   
    }
    catch (err) {
      setAlert({
        ...alert,
        open: true,
        message: "Failed to load search results"
      })
    }
  }



  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="white"
        width="100%"
        padding="10px 10px"
      >
        <Tooltip title="serch users to chat" placement="bottom-end" arrow >
          <Button variant="contained" color="inherit" size="medium" onClick={() => setisDrawopen(true)}>
            <SearchIcon fontSize="medium" />
            <Typography color="inherit">Search User</Typography>
          </Button>
        </Tooltip>
        {/*  title of app */}
        <Typography variant='h4' fontFamily="sans-serif">Chit-Chat</Typography>

        {/* Menu 1 */}.
        <Button
          endIcon={<KeyboardArrowDownIcon />}
          onClick={clickHandler}>
          <Avatar
            src={user?.user?.pic}

            sx={{ bgcolor: "blue" }}
          ></Avatar>
        </Button>
        <Menu anchorEl={anchorEl} open={open} onClose={closeHandler}>
          <MenuItem onClick={closeHandler}> Profile</MenuItem>
          <MenuItem onClick={logoutHandler}> SignOut</MenuItem>
        </Menu>
        {/* Menu-2 */}
      </Box>
      <Drawer

        anchor='left'
        open={isDrawopen}
        onClose={() => setisDrawopen(false)}>
        <Box p={2} width="300px" textAlign="center">
          <Typography variant='h6' color="blue" marginBottom="20px">Search User</Typography>
          <Stack direction="row" justifyContent="center">
            <TextField
              size='small'
              placeholder='search user'
              onChange={(e) => setSearch(e.target.value)}

            />
            <Button onClick={searchHandler}>
              <SearchIcon />
            </Button>
          </Stack>
        </Box>
        {loading ? <ChatLoading /> : searchResult?.map((eachuser)=>{
      
          return (
            <UserListItems user={eachuser} handleFunction= {()=>accesschat(eachuser._id)}/>
          )
        })}

      </Drawer>








      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}   // is takes object which contains position of snackbar
      >
        <Alert onClose={() => { setAlert({ ...alert, open: false }) }}
          severity="warning"
          sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>



    </>
  )
}

export default SideDrawer