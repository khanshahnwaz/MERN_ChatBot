import { Avatar, Box, Button, IconButton, Typography } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { useEffect, useRef, useState } from 'react';
import { red } from '@mui/material/colors';
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { getChats, sendChatRequest } from '../helpers/api-communicator';

type Message={
  role:string,
  content:string
};
const Chat = () => {
  const inputRef=useRef<HTMLInputElement|null>(null)
  const auth=useAuth();
  
  const [chatMessages,setChatMessages]=useState<Message[]>([]);

  // get the chats
  useEffect(()=>{
    const getData=async ()=>{
    const data=await getChats();
    console.log(data);
    setChatMessages(data.chats);
  }
  getData();
  },[])
  const handleSubmit=async ()=>{
    const content=inputRef.current?.value as string;
   if(inputRef && inputRef.current){
    inputRef.current.value="";
   }
   const newMessage:Message={role:"user",content};
   setChatMessages((prev)=>[...prev,newMessage])
    // console.log(inputRef.current?.value)

    // send api request 
    const chatData= await sendChatRequest(content);
    setChatMessages([...chatData.chats])
  }

  
  
  return (
    <Box
  sx={{
    display: 'flex',      // Use flexbox for layout
    flex: 1,              // Make the parent container flex to take full space
    width: '100%',
    height: '100%',
    mx: 'auto',
    gap: 3
  }}
>
  {/* First Box: Fixed size on larger screens, hidden on smaller ones */}
  <Box sx={{ display: { md: 'flex', xs: 'none', sm: 'flex' }, flexShrink: 0 }}>
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '60vh',
        bgcolor: 'rgb(17,29,39)',
        borderRadius: 5,
        flexDirection: 'column',
        mx: 3
      }}
    >
      <Avatar sx={{ mx: 'auto', my: 2, bgcolor: 'white', color: 'black', fontWeight: 700 }}>
        {/* {auth?.user?.name[0]} */}
        {/* {auth?.user?.name.split(" ")[1][0]} */}
      </Avatar>
      <Typography sx={{ mx: 'auto', fontFamily: "work sans" }}>
        You are talking to a ChatBOT
      </Typography>
      <Typography sx={{ mx: 'auto', fontFamily: "work sans", my: 4, p: 3 }}>
        You can ask some questions related to programming, business, education, etc.
      </Typography>
      <Button
        sx={{
          width: '200px',
          my: 'auto',
          color: 'white',
          fontWeight: 700,
          borderRadius: 3,
          mx: 'auto',
          bgcolor: red[300],
          ":hover": {
            bgcolor: red.A400
          }
        }}
      >
        Clear Conversation
      </Button>
    </Box>
  </Box>

  {/* Second Box: Takes up the remaining space */}
  <Box
    sx={{
      display: 'flex',
      flex: 1,              // Make this box take up all remaining space
      flexDirection: 'column',
      mx: 'auto',
      px: 3
    }}
  >
    <Typography
      sx={{
        textAlign: 'center',
        fontSize: '48px',
        color: 'white',
        mx: 'auto',
        width: 'max-content',
        fontWeight: 600
      }}
    >
      Model-Gemini-1.5-pro
    </Typography>
    <Box
      sx={{
        width: '100%',
        height: '60vh',
        borderRadius: 3,
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'scroll',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        overflowY: 'auto'
      }}
    >
      {/* Chat messages */}
      {chatMessages?.map((chat,i) => {
        return <ChatItem key={i} content={chat.content} role={chat.role} />;
      })}
    </Box>

    {/* Input area */}
    <div
      style={{
        width: '100%',
        padding: '20px',
        borderRadius: 8,
        backgroundColor: 'rgb(17,27,39)',
        display: 'flex',
        margin: 'auto'
      }}
    >
      <input
      ref={inputRef}
        type="text"
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          padding: '10px',
          border: 'none',
          outline: 'none',
          color: 'white',
          fontSize: '20px'
        }}
      />
      <IconButton onClick={handleSubmit} sx={{ ml: 'auto', color: 'white' }}>
        <IoMdSend />
      </IconButton>
    </div>
  </Box>
</Box>

  )
}

export default Chat