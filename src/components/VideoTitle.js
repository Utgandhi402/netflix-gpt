import React from 'react'

const VideoTitle = ({title, overview}) => {
  return (
    <div className='pt-[20%] px-12 absolute w-screen aspect-video text-white bg-gradient-to-r from-black'>
      <h1 className='text-4xl font-bold'>{title}</h1>
      <p className='text-sm py-6 w-1/3'>{overview}</p>

      <div>
        <button className='bg-white text-xl text-black p-4 px-10  rounded-lg hover:bg-opacity-80'>▶️ Play</button>
        <button className=' mx-2 bg-gray-500 text-xl text-white p-4 px-10 bg-opacity-50 rounded-lg '>⚠ More Info</button>
      </div>
    </div>
  )
};

export default VideoTitle;
