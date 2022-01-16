import React from 'react'

const Search = (props) => {
  return (

        <input
            type="text"
            id="header-search"
            placeholder="Search Currency"
            name="coin" 
            onInput={(event) => {  props.search(event.target.value) }}
        />


  )
}

export default Search
