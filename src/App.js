import React from 'react';
import "./App.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatProvider from './context/ChatProvider';
import Home from './Pages/Home';
import ChatsPage from './Pages/ChatsPage';


function App() {
  return (
    <div class="App" >
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chats" element={<ChatsPage />} />
          </Routes>

        </ChatProvider>


      </BrowserRouter>

    </div>



  )
}

export default App;
