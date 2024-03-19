import React from 'react'
import Header from './Header'
import { useState } from 'react';

const Login = () => {

  const [isSignInForm, setIsSignForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignForm(!isSignInForm);
  }



  return (
    <div>
      <Header/>
      <div className="absolute">
      <img className = "" src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
      alt='background'
      />
      </div>
      <form className="absolute bg-black p-12 w-3/12 my-24 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80">
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && <input 
        type='text' 
        placeholder='Full Name' 
        className='p-4 my-4 w-full bg-gray-700'
        />}
        <input 
        type='text' 
        placeholder='Email Address' 
        className='p-4 my-4 w-full bg-gray-700'
        />
        <input 
        type='text' 
        placeholder='Email Address' 
        className='p-4 my-4 w-full bg-gray-700'
        />
        <button className='p-4 my-6 bg-red-500 w-full rounded-lg'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className='p-4 cursor-pointer' onClick={toggleSignInForm} >
        {isSignInForm ? "New to Netflix? Sign Up Now." : "Already Registered? Sign In Now."}
        </p>
      </form>
      
      
    </div>
  )
}

export default Login
