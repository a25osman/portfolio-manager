import { Container, getBottomNavigationActionUtilityClass, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import NavBar from "../components/NavBar";
import NewItem from "../components/NewItem";
import "../css/Newscss.css";
import { useLocation } from "react-router";
import { UserContext } from "./Home";
import { ClassNames } from "@emotion/react";
import { margin, padding } from "@mui/system";


const News = () => {
  const [news, setNews] = useState([]);
  const { state } = useLocation();
  //const { currentUser } = useContext(UserContext);
  const user = state;
  const d = new Date();
  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=(crypto)&from=${d}&sortBy=publishedAt&language=en&apiKey=ef200ee90c914524a04e35fdef13fbb7`
      )
      .then((res) => {
        const getNews = res.data.articles;
        setNews(getNews);
      });
  }, []);

  const articles = news.map((article, index) => {
    console.log(article);
    return (
      <NewItem
        key={`${index}-${article.title}`}
        description={article.description}
        title={article.title}
        url={article.url}
        urlToImage={article.urlToImage}
      />
    );
  });

  return (
    <div>
      <NavBar />

      {/* <div className="news_parent">{articles}</div> */}
      <Container sx={{
          bgcolor: 'background.paper',
          padding: "10px",
          marginTop: "10px"
      }} maxWidth="lg">
         {/* <h1 className="news_title">Crypto News</h1> */}
         <Container maxWidth='sm' gutterBottom sx={{marginBottom:"10px"}}>
           <Typography variant="h2" align="center" color='textPrimary' gutterBottom>
            Crypto News
           </Typography>

           <Typography variant="h5" align="center" color='textSecondary' paragraph>
            This Page Contains a List of Popular Crypto Currency News Articles, Retrieved From Various English Speaking Sources, Collected Over The Past 24 Hour Period. 
           </Typography>
         </Container>
        <Grid container spacing={2} justify="center">
          {articles}
        </Grid>
      </Container>
    </div>
  );
};

export default News;
