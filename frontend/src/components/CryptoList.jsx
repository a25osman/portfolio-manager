import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Coin from "./Coin";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import Search from "./Search";
import "../cryptolist.css";

export default function CryptoList() {
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
    <div class="cryptolist">
      <Box
        sx={{
          width: "100%",
          height: 400,
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        <Search search={handleSearch} />
        <FixedSizeList
          height={600}
          width={600}
          itemSize={115}
          itemCount={1}
          overscanCount={5}
          backgroundColor={"red"}
        >
          {renderRow}
        </FixedSizeList>
      </Box>
    </div>
  );
}
