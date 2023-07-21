export const getSender = (loggedUser,user)=>{
  let senderName = ""
//   console.log(loggedUser, user)
  if(user[0]._id !== loggedUser._id){
    senderName = user[0].name
  }
  else{
    senderName = user[1].name
  }


    return senderName

}



