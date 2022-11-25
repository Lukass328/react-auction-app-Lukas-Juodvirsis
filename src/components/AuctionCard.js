import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import CountdownTimer from './CountdownTimer'

function AuctionCard({ x, i }) {

  const nav = useNavigate()
  const check = () => {
    nav(`/auction/${x._id}`)


  }
  return (
    <div>


      {<div onClick={() => check(x._id)} key={i} className='card '><img src={x.image} alt="" /><h4>{x.title}</h4>
        <p> <CountdownTimer targetDate={x.time} /></p>
        <p> Start Price: {x.price}</p>
        <p>Bids quantity: {x.bidHistory.length}</p></div>
      }



    </div>
  )
}

export default AuctionCard