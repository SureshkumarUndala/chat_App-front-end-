import { Alert, Avatar, Box, Button, Drawer, Menu, MenuItem, Snackbar, Stack, TextField, Tooltip, Typography } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { useNavigate } from 'react-router-dom';


const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState("")
  const [anchorEl, setAnChorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [isDrawopen, setisDrawopen] = useState(false)
  const Navigate = useNavigate()
  const [alert, setAlert] = useState({ open: false, message: "" })
  const [loading,setLoading] = useState(false)
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

  const searchHandler = () => {
    if (!search) {
      setAlert({ ...alert, open: true, message: "please Enter Something in Search" })
      return


    }
    try{
      setLoading(true)

    }
    catch(err){

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

        {/* Menu 1 */}
        <Button

          endIcon={<KeyboardArrowDownIcon />}
          onClick={clickHandler}>
          <Avatar sx={{ bgcolor: "blue" }}>Suresh</Avatar>
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