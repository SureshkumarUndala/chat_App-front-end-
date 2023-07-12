import { Avatar, List, ListItemAvatar, ListItemButton, Box, ListItemText, ListItemIcon, Divider } from "@mui/material";
import React from "react";



const UserListItems = ({user, handeleFunction}) => {
    

    return (
        <Box onClick = {handeleFunction}>
            <List  >
                <ListItemButton>
                    <ListItemIcon>
                        <ListItemAvatar>
                            <Avatar  src={user?.pic}> </Avatar>
                        </ListItemAvatar>
                    </ListItemIcon>

                    <ListItemText primary={user?.name} secondary={user.email} />
                </ListItemButton>
            </List>
             <Divider/>
        </Box>
    )
}

export default UserListItems