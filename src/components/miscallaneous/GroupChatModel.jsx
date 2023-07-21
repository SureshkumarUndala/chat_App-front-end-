import { Box, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText,
       DialogTitle, Divider, FormControl, Snackbar, Stack, TextField } from '@mui/material'
import React, {useState } from 'react'
import { ChatState } from '../../context/ChatProvider'
import axios from 'axios';
import UserListItems from "./UserListItems"
import CloseIcon from '@mui/icons-material/Close';

const GroupChatModel = ({children}) => {

    const [open, setopen]  = useState(false)
    const [groupChatName, setgroupChatName] = useState()
    const [selectedUsers, setselectedUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({open:false, message:""})
    const {user, chats, setChats} = ChatState()

    const handleSearch = async (query)=>{
        console.log(query)
        setLoading(true)
       
        if(!query){
            setLoading(false)
            return
        }
        try{
          console.log(user.user.token)
            const { data } = await axios.get(`http://localhost:8080/api/v1/users/?search=${query}`, {
              headers: {
                Authorization: "Bearer " + user?.user?.token
              }
            })
            setLoading(false)
            // console.log(data)
            setSearchResult(data)
        


        }
        catch(error){
            console.log(error)
        }



    }

    const deleteuser = (userId)=>{
        setselectedUsers(selectedUsers.filter((user)=>user._id !== userId))
    }

    const handleGroup = (userToadd) => {
        if(selectedUsers.includes(userToadd)){
            alert('user already exist')
            return
        }
       setselectedUsers([...selectedUsers, userToadd])
    }
    const handleSubmit = async()=>{
        if(!groupChatName || !selectedUsers){
            setAlert({...alert, open:true, message:"please fill all fields"})
            return
        }
        try{

       const {data} = await axios.post("http://localhost:8080/api/v1/chat/group",{
        name:groupChatName,
        users: JSON.stringify(selectedUsers.map(user=>user._id))
       },{
        headers:{
            Authorization: `Bearer ${user.user.token}`
        }
      
       })
         setChats([data?.fullGroupChat, ...chats])
        // console.log(data)

        }
      
        catch(err){
            setAlert({...alert, open:true, message:err.response.data.error})
            
        }
    
        setopen(false)
      
    }
  return ( 
    <>
    <span onClick={()=>setopen(true)}> {children} </span>
    <Dialog open={open}>
        <DialogTitle
          fontSize="30px"
          
          textAlign="center"
        >
            Create Group Chat
        </DialogTitle>
        <DialogContent display="flex" 
          flexDirection="column"
          sx={{minHeight:"300px", width:"500px", alignItems:"center" }}
           
          >
            
            <FormControl fullWidth sx={{marginBottom:"10px"}} >
                <TextField placeholder='chatName'onChange={(e)=>setgroupChatName(e.target.value)}
                  />
          
            </FormControl>
            

            <FormControl fullWidth sx={{marginBottom:"10px"}} >
                <TextField placeholder='Add users eg:-suresh, ramesh'  onChange={(e)=>handleSearch(e.target.value)}/>
          
            </FormControl>
            {/* render selected users */}
           
                {selectedUsers?.length>0 && <Stack flexDirection="row" gap={1}>
                    {selectedUsers?.map(eachUser=>(
                        <Button variant='contained'  color="success" endIcon={<CloseIcon onClick={()=>deleteuser(eachUser._id)}
                       />}>
                            {eachUser.name}
                            </Button>
                    ))}
                    </Stack>
                    }
          

            {/* renderSearchResults */}
            {loading ? <Box textAlign="center"><h2 >Loading...</h2></Box>:
             searchResult?.slice(0,4).map((user)=>(
                <UserListItems key={user._id} user={user} handleFunction={()=>handleGroup(user)}/>
            ))}

        </DialogContent >
 
        <DialogActions>
            <Button variant='contained' onClick={handleSubmit}>Create Chat</Button>
        
        </DialogActions>
    
    </Dialog>
    <Snackbar   open={alert.open}
              message={alert.message}
              autoHideDuration={5000}
              onClose={()=>{setAlert({...alert, open:false})}}  
              anchorOrigin={{
                vertical:"top",
                horizontal:"center"
              }}

    >

    </Snackbar>
    </>

  )
}

export default GroupChatModel