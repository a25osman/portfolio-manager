import { getBottomNavigationActionUtilityClass } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import NewItem from "../components/NewItem";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=(crypto AND bitcoin)&from=2021-12-17&sortBy=publishedAt&apiKey=ef200ee90c914524a04e35fdef13fbb7"
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
      <h2>This is News Page</h2>
      {articles}
    </div>
  );
};

export default News;
