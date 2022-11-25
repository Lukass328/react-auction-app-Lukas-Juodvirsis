import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MainContext from '../context/MainContext'
import AuctionCard from './AuctionCard'


function AuctionList() {
  const nav = useNavigate()
  const { allItems } = useContext(MainContext)

  const navigate = () => {
    nav('/upload')
  }
  return (
    <div className='auction'>

      <h1>Auction</h1>
      <div className='auction-btn'>
        <button onClick={navigate} className='back-btn'>Upload auction</button>

      </div>
      <div className='auction-box'>

        {allItems.map((x, i) => <AuctionCard x={x} key={i} />)}

      </div>
    </div>
  )
}

export default AuctionList