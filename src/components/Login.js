import React from 'react'
import Header from './Header'
import { useState, useRef } from 'react';
import { checkValidData } from '../utils/validate';
import {createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';

import { addUser } from '../utils/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignInForm, setIsSignForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);


  const toggleSignInForm = () => {
    setIsSignForm(!isSignInForm);
  }


  const handleButtonClick = () => {
    //Validate the form data

   const message = checkValidData(email.current.value, password.current.value);
   setErrorMessage(message);

    if(message){
      return;
    }

    if(!isSignInForm){
      //Sign Up Logic
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name.current.value, 
          photoURL: "https://tse1.mm.bing.net/th?id=OIP.JPllmkWBqX_ALvUO_DAnZwHaE7&pid=Api&P=0&h=180",
        }).then(() => {
          // Profile updated!
          // ...  
          const {uid, email, displayName, photoURL} = auth.currentUser;
          dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        navigate("/browse");
        }).catch((error) => {
          // An error occurred
          // ...
          setErrorMessage(error.message);
        });
        
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode + "-" + errorMessage);
        });

    }
    else{
      //Sign In Logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      navigate("/browse");
      })
      .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode + "-" + errorMessage);
      });

    }

  }



  return (
    <div>
      <Header/>
      <div className="absolute">
      <img className = "" src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
      alt='background'
      />
      </div>
      <form onSubmit={(e) => e.preventDefault()} className="absolute bg-black p-12 w-3/12 my-24 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80">
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && 
        <input 
        ref = {name}
        type='text' 
        placeholder='Full Name' 
        className='p-4 my-4 w-full bg-gray-700'
        />}
        <input 
        ref={email}
        type='text' 
        placeholder='Email Address' 
        className='p-4 my-4 w-full bg-gray-700'
        />
        <input 
        ref={password}
        type='password' 
        placeholder='Password' 
        className='p-4 my-4 w-full bg-gray-700'
        />
        <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>
        <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>
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
