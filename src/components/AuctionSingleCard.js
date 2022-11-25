import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import MainContext from '../context/MainContext';
import CountdownTimer from './CountdownTimer'
import io from "socket.io-client"
const socket = io.connect('http://localhost:5000');
function AuctionSingleCard() {
  const realTime = new Date();
  console.log('realTime ===', realTime);
  const { _id } = useParams()
  const bidRef = useRef()
  const { user, setuser, amount, setAmount, allItems } = useContext(MainContext)


  const [auction, setAuction] = useState([])
  const [sum, setSum] = useState()




  console.log('auction ===', auction);

  useEffect(() => {
    const singleUserApiUrl = `http://localhost:5000/auctions/${_id}`
    //fetch users from json placeholder
    fetch(singleUserApiUrl)
      .then((response) =>
        response.json(),
      )
      .then((json) => setAuction(json.data))
  }, [_id])


  const setBid = async () => {
    const userValues = {
      bid: bidRef.current.value,
      bidder: user,
      item_id: auction._id
    }

    console.log('userValues ===', userValues);
    const res = await fetch('http://localhost:5000/update', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(userValues),
    })
    const response = await fetch('http://localhost:5000/update-bid', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(userValues),
    })

  }


  return (
    <div>
      <Link to='/auction'>Go back</Link>

      <div className='single-card' >
        <div className='image'>
          <img src={auction.image} alt="" />

        </div>
        <div className='bids-table'>
          <div className='info'>
            <h4>{auction.title}</h4>

            <p>Start Price: {auction.price} </p>




            <p> <CountdownTimer targetDate={auction.time} /></p>

          </div>
          <div className='user-bids'>
            <div className='names'>
              {allItems.map((x, i) => x.bidHistory.map((x, i) => <h5>{x.bidder} {x.bid}</h5>))}




            </div>
          </div>
          <div className='bids'>
            <div className=''>
              <div>Amount:  {sum}</div>

              <input ref={bidRef} type="number" placeholder='your bid' />
              <button onClick={setBid}>set</button>

            </div>
          </div>

        </div>
      </div>






    </div>
  )
}

export default AuctionSingleCard