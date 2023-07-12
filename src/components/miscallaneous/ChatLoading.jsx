import { Skeleton, Stack } from '@mui/material'
import React from 'react'

const ChatLoading = () => {
  return (
    <Stack alignItems="center" spacing={2}>
        <Skeleton variant="rounded"  width={250} height={60} />
        <Skeleton variant="rounded"  width={250} height={60} />
        <Skeleton variant="rounded"  width={250} height={60} />
    

    </Stack>
    
       
  )
}

export default ChatLoading