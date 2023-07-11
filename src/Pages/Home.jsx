import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Container, Tab, Tabs, Typography } from '@mui/material'
import React, { useState } from 'react'
import Signup from '../components/authentication/Signup'
import Login from '../components/authentication/Login'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const [value, setValue] = useState(0)
    const navigate = useNavigate()

    const changeHandler = (e, val) => {
        setValue(val)
    }

    useEffect(()=>{
        // if user is logged in push him back to chats page
        const userinfo = JSON.parse(localStorage.getItem("user_Info"))
        if(userinfo){
           navigate("/chats")
        }  
    },[navigate])

    return (
        <Container
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}
            maxWidth="xl"
            backgroundColor="black">
            <Box
                display="flex"
                justifyContent="center"
                backgroundColor="white"
                padding={3}
                margin="60px 0 15px 0"
                width="500px"
                borderRadius="8px"
            >
                <Typography
                    variant='h4'
                >Chit-Chat</Typography>

            </Box>
            <Box
                bgcolor="white"
                width="500px"
                variant="soft-rounded"
                padding={3}
                borderRadius="8px"
            >
                <TabContext value={value}>
                    <TabList
                        onChange={changeHandler}
                        textColor="primary"
                        indicatorColor='primary'
                        centered // for centered the tabs in available width
                    >
                        <Tab label="Signup" />
                        <Tab label="Login" />
                    </TabList>
                    <TabPanel value={0}>
                        <Signup />
                    </TabPanel>
                    <TabPanel value={1}>
                        <Login />
                    </TabPanel>


                </TabContext>




            </Box>

        </Container>


    )
}

export default Home