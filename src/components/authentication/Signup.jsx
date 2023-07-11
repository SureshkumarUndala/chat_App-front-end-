import { FormControl, FormLabel, TextField, Stack, Button, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const [show,setShow] = useState(false)
    const [user, setuser] = useState({ name: "", email: "", password: "", confirm_password: "", pic: "" })

    const [alert, setAlert] = useState({open:false, message:""})
    const Navigate = useNavigate()






  


    const clickHandler = () => setShow(!show) // for toggle the type of password input field

    const handleClose = ()=>{
        setAlert({...alert, open:false})
    }

    const postDetails = (pic)=>{


        if(pic === undefined){
            setAlert({
                ...alert, 
                open:true ,
                 message:"please Select an Image",
                })
            return;

        }
        if(pic.type === "image/jpeg" || pic.type === "image/png"){
            const data = new FormData()
            data.append("file", pic)
            data.append("upload_preset", "chat_app")
            data.append("Cloud Name", "du762llex")
            fetch("https://api.cloudinary.com/v1_1/du762llex/image/upload",{
                method:"post",
                body: data,

            }).then(res=>res.json())
            .then(data=>{
                setuser({...user, pic:data.url.toString()})
                setAlert({...alert, open:true, message:"pic uploaded"})
            
            })
            .catch(err=>{
                console.log(err)
             
            })
        
        }
        else{
            setAlert({...alert, 
                open:true,
                message:"Please Select an Image"
            })
            return;
        }




    }


    const submitHandler = async()=>{
        // console.log(user)
        if(!user.name || !user.email || !user.password || !user.confirm_password){
            setAlert({...alert, open:true, message:"Please Fill all the Fields"})
       
            return
        }
        if(user.password !== user.confirm_password){
            setAlert({...alert, open:true, message:"Password Do Not Match"})
         
            return

        }
        try{
              const {data} = await axios.post("http://localhost:8080/api/v1/users/register",user)
              
              setAlert({...alert,
                open:true,
                message:data.message
            })
            localStorage.setItem("user_Info", JSON.stringify(data))
          
            Navigate("/chats")

        }
        catch(err){
          
         setAlert({...alert,
           open:true,
        message:err.response.data.error})

        }


    }


    return (

        <Stack spacing={2} >
            <FormControl>
                <TextField
                    label="name"
                    placeholder='Enter Your Name'
                    onChange={(e) => { setuser({ ...user, name: e.target.value }) }}
                    required
                  
                />
            </FormControl>
            <FormControl>
                <TextField
                    label="email"
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

            <FormControl>
                <TextField
                    label="confirm-password"
                    placeholder='Enter Your Password'
                    type={show?"text":"password"}
                    InputProps={{
                        endAdornment:
                            <InputAdornment position="end">
                            <Button onClick={clickHandler}>{
                            show? "Hide":"Show"}</Button>
                            </InputAdornment>
                    }}
                    onChange={(e) => { setuser({ ...user, confirm_password: e.target.value }) }}
                    required
                />
            </FormControl>
            <FormControl>
                <TextField
                    type='file'
                    onChange={(e) => { postDetails(e.target.files[0]) }}
                    required
                  
                />
            </FormControl>
            <Button 
            type="submit" 
             variant='contained'
             onClick={submitHandler} 
        
             >Sign Up</Button>

             <Snackbar
              open={alert.open}
              message={alert.message}
              autoHideDuration={5000}
              onClose={handleClose}  
           
             ></Snackbar>

    
              


        </Stack>



    )

}

export default Signup