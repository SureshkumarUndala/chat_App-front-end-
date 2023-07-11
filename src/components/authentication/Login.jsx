import { FormControl, FormLabel, TextField, Stack, Button, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [show,setShow] = useState(false)
    const [user, setuser] = useState({  email:"", password: "" })
    const [alert, setAlert] = useState({open:false, message:""})
    const Navigate = useNavigate()



    const clickHandler = ()=>{
        setShow(!show)     // if show is true, type of input field is text otherwise it is password type
    }
    const handleClose = ()=>{
        setAlert({...alert, open:false})
    }

    const submitHandler = async()=>{
        // console.log(user)
        if( !user.email || !user.password ){
            setAlert({...alert, open:true, message:"Please Fill all the Fields"})
       
            return
        }
      
        try{
              const {data} = await axios.post("http://localhost:8080/api/v1/users/login",user)
              
            
            localStorage.setItem("user_Info", JSON.stringify(data))
          
            Navigate("/chats")

        }
        catch(err){
           console.log(err.response.data)
         setAlert({...alert,
           open:true,
        message:err.response.data.message})

        }


    }

    return (
        <Stack spacing={2} >
            
            <FormControl>
                <TextField
                    label="Email"
                    placeholder='Enter Your Email'
                    onChange={(e) => { setuser({ ...user, email: e.target.value }) }}
                    required
                 
                />
            </FormControl>

            <FormControl>
                <TextField
                
                    label="Password"
                    type={show?"text":"password"}
                    placeholder='Enter Your Password'
                    onChange={(e) => { setuser({ ...user, password: e.target.value }) }}
                    required
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                            <Button onClick={clickHandler}>{
                            show? "Hide":"Show"}</Button>
                            </InputAdornment>
                    }}
                />
            </FormControl>

        
             
            <Button type="submit" onClick={submitHandler} variant='contained'>Login </Button>
            <Snackbar
              open={alert.open}
              message={alert.message}
              autoHideDuration={5000}
              onClose={handleClose}  
              anchorOrigin={{
                vertical:"top",
                horizontal:"center"
              }}
           
             ></Snackbar>

        </Stack>



    )
}

export default Login