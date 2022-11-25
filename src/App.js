import './App.css';
import MainContext from './context/MainContext'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import io from "socket.io-client"
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import AuctionUploadPage from './pages/AuctionUploadPage'
import AuctionListPage from './pages/AuctionListPage'
import AuctionSingleCardPage from './pages/AuctionSingleCardPage'
import { useEffect, useState } from 'react';
// const socket = io.connect('http://localhost:5000');
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState('')
  const [allItems, setAllItems] = useState([])






  useEffect(() => {

    getItems()
  }, [])



  const getItems = async () => {
    const res = await fetch('http://localhost:5000/auctions', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      credentials: "include",

    })
    const data = await res.json();
    setAllItems(data.data)



  }


  const get = async () => {
    const res = await fetch('http://localhost:5000/auth', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
      credentials: "include",

    })
    const data = await res.json();
    console.log('data ===', data);
    setUser(data.user)
    setIsLoggedIn(data.loggedIn)

  }


  useEffect(() => {
    get()



  }, [])

  const states = {
    user,
    setUser,
    allItems,




  }
  return (
    <div >
      <MainContext.Provider value={states}>
        <BrowserRouter>



          <Routes>
            <Route path='/' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/upload' element={isLoggedIn && <AuctionUploadPage />} />
            <Route path='/auction' element={isLoggedIn && <AuctionListPage />} />
            <Route path='/auction/:_id' element={isLoggedIn && <AuctionSingleCardPage />} />


          </Routes>
        </BrowserRouter>

      </MainContext.Provider>
    </div>
  );
}

export default App;
