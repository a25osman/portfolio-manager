import React from 'react'

export const NewItem = ({urlToImage, url, description, title}) => {
  return (
    <div>
      <img src={urlToImage} alt="New Image" />
      <h3>
        <a href={url}>{title}</a>
        <p>{description}</p>
      </h3>
    </div>
  )
}

export default NewItem;

