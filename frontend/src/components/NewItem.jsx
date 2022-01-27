import React from 'react'
import '../css/Newscss.css'
import { Grid, Container, CardMedia, CardContent, Typography, Link, Card } from '@mui/material'
import { makeStyles } from "@material-ui/core";
import { typography } from '@mui/system';
import { Title } from 'chart.js';



export const NewItem = ({ urlToImage, url, description, title }) => {

  return (

    // <div className="news-section">
    //   <img className="news-image" src={urlToImage} alt="New Image" />
    //   <h3 className="news_text">
    //     <a href={url}>{title}</a>
    //     <p className="news_description">{description}</p>
    //   </h3>
    // </div>

    <Grid item xs={12} sm={12} md={4}>
      <Card sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 4,
      }}>
        <CardMedia
          sx={{paddingTop: "56.25%"}}
          image={urlToImage}
          title={title}
        ></CardMedia>
        <CardContent sx={{flexGrow: 1}}>
          <Typography gutterBottom variant="h5">
            <Link href={url}>{title}</Link>
          </Typography>
          <Typography>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>



  )
}

export default NewItem;


