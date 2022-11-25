import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainContext from '../context/MainContext';
import io from "socket.io-client"
// const socket = io.connect('http://localhost:5000');


function AuctionUpload() {
  const { user } = useContext(MainContext)
  const [startPrice, setStartPrice] = useState()
  const nav = useNavigate()
  const imageRef = useRef()
  const titleRef = useRef()
  const timeRef = useRef()
  const priceRef = useRef()
  const back = () => {
    nav('/auction')
  }
  const upload = async () => {
    const uploadValues = {
      image: imageRef.current.value,
      title: titleRef.current.value,
      time: timeRef.current.value,
      price: priceRef.current.value,
      bid: 0,
      bidder: 'none',

    }

    console.log('uploadValues ===', uploadValues);
    const res = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(uploadValues),

    })

    const data = await res.json();

    console.log('data ===', data);

  }
  return (
    <div className='upload'>
      <button onClick={back} className='back-btn'>Back to auction</button>
      <div className='upload-section'>
        <h1>Upload Auction</h1>
        <label htmlFor='image'>Your image</label>
        <input ref={imageRef} type="url" name='image' />

        <label htmlFor="title">Your title</label>
        <input ref={titleRef} type="text" name='title' />

        <label htmlFor="time">Set your time duration</label>
        <input ref={timeRef} type="datetime-local" />

        <label htmlFor="price">Your start price</label>
        <input ref={priceRef} type="number" name='price' />
        <div className='upload-btn'>

          <button onClick={upload}>Upload auction</button>
        </div>
      </div>
    </div>
  )
}

export default AuctionUpload