import React from 'react'
import GPtSearchBar from './GptSearchBar'
import GptMovieSuggestion from './GptMovieSuggestion'
import { BG_URL } from '../utils/constant'


const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
      <img className = "" src={BG_URL} 
      alt='background'
      />
      </div>
      <GPtSearchBar/>
      <GptMovieSuggestion/>
    </div>
  )
}

export default GptSearch
