import React, { useState } from 'react'


const SearchBar = (props) => {
  const { onChange, value } = props
  return (
    <>
      <label htmlFor='search-name' >Search Goals</label>
      <input
      className="m-2"
        type="search"
        placeholder="Search here"
        onChange={onChange}
        value={value} 
        name="search"
        />
    </>


  )
}


export default SearchBar;