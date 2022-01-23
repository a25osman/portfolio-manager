import React from 'react'
import '../css/Newscss.css'

export const NewItem = ({urlToImage, url, description, title}) => {
  return (
    <div className="news-section">
      <img className="news-image" src={urlToImage} alt="New Image" />
      <h3 className="news_text">
        <a href={url}>{title}</a>
        <p className="news_description">{description}</p>
      </h3>
    </div>
  )
}

export default NewItem;


