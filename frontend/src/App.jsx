import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

import NavBar from "./components/navbar";
import Coin from "./components/Coin"
import Search from "./components/Search";



function App() {
  const [coins, setCoins] = useState([]);
  
  
  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=CAD&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(response => {
        const data = response.data.map(d => {
          return {...d, show: true}
       })   
       setCoins(data)
        console.log(data);
      });
  }, []);

const handleSearch = (search) =>{
  console.log(search)
  if (search === ""){
    let update =  coins.map((coin)=>{
      return {...coin, show : true}
    })
    setCoins(update)
  } else {
    let update = coins.map((coin)=>{
      let show = (coin.name.toUpperCase().startsWith(search.toUpperCase().trim()))
      return {...coin, show}
    })
    setCoins(update)
  }
} 

const coinElements = coins.filter(coin => {
  return coin.show
}).map((coin) => { 

  return <Coin 
      key={coin.id}
      image={coin.image}
      name={coin.name}
      symbol={coin.symbol}
      price={coin.current_price}
      market={coin.market_cap}
      priceChange={coin.price_change_percentage_24h}
      />
});

  return (
    <div className="App">
      <NavBar />
      <Search  search={handleSearch}/>
      {coinElements}
    </div>
  );
}

export default App;
