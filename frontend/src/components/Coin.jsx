import React from 'react'

const Coin = ({ image, name, symbol, price, market, priceChange}) => {
  
  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt='crypto'/>
          <h1>{name}</h1>
          <p className="coin-sym">{symbol}</p>
        </div>
        <div className="data">
          <p className="price">${price}</p>
          <p className="mrk-cap">${market}</p>
          {priceChange > 0 ? <p className="priceChange green" >{priceChange}%</p> : <p className="priceChange red">{priceChange}%</p>
          }

        </div>
      </div>
    </div>
  )
}

export default Coin
