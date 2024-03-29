import React, { useEffect } from 'react'
import {auth} from '../utils/firebase';
import {onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constant';

const Header = () => {
  const navigate = useNavigate(); 
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth).then(() => {})
    .catch((error) => {
      // An error happened.
      navigate("/error");
      
    });
  }


  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
    
  }, []);



  return (
    <div className='absolute w-screen py-2 px-8 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className = "w-44" src={LOGO} alt='Logo'/>
      {user && <div className='flex'>
        <img className = "w-10 h-10 my-4 mx-2"  alt='userLogo' src={user?.photoURL}/>
        <button onClick= {handleSignOut} className='font-bold text-white cursor-pointer'>(Sign Out)</button>
      </div>}
    </div>

  )
}

export default Header
