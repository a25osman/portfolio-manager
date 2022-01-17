import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

import NavBar from "./components/navbar";
import VirtualizedList from "./components/list";
import Coin from "./components/Coin";
import Search from "./components/Search";
import handleSearch from "./components/list";
import { Box } from "@mui/system";
import { FixedSizeList } from "react-window";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function App() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=CAD&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        const data = response.data.map((d) => {
          return { ...d, show: true };
        });
        setCoins(data);
        console.log(data);
      });
  }, []);

  const handleSearch = (search) => {
    console.log(search);
    if (search === "") {
      let update = coins.map((coin) => {
        return { ...coin, show: true };
      });
      setCoins(update);
    } else {
      let update = coins.map((coin) => {
        let show = coin.name
          .toUpperCase()
          .startsWith(search.toUpperCase().trim());
        return { ...coin, show };
      });
      setCoins(update);
    }
  };

  const coinElements = coins
    .filter((coin) => {
      return coin.show;
    })
    .map((coin) => {
      return (
        <Coin
          key={coin.id}
          image={coin.image}
          name={coin.name}
          symbol={coin.symbol}
          price={coin.current_price}
          market={coin.market_cap}
          priceChange={coin.price_change_percentage_24h}
        />
      );
    });

  function renderRow(props) {
    const { index, style } = props;
    return coins
      .filter((coin) => {
        return coin.show;
      })
      .map((coin) => {
        return (
          <Coin
            key={coin.id}
            image={coin.image}
            name={coin.name}
            symbol={coin.symbol}
            price={coin.current_price}
            market={coin.market_cap}
            priceChange={coin.price_change_percentage_24h}
          />
        );
      });
  }

  return (
    <div className="App">
      <NavBar />
      <h1>Tradeable Assets</h1>
      <Search search={handleSearch} />
      <Box
        sx={{
          width: "100%",
          height: 900,
          maxWidth: 500,
          bgcolor: "background.paper",
          margin: "auto",
        }}
      >
        <FixedSizeList
          height={600}
          width={480}
          itemSize={115}
          itemCount={1}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </div>
  );
}

export default App;
