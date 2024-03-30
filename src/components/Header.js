import React, { useEffect } from 'react'
import {auth} from '../utils/firebase';
import {onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constant';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';
const Header = () => {
  const navigate = useNavigate(); 
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth).then(() => {})
    .catch((error) => {
      // An error happened.
      navigate("/error");
      
    });
  }

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
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

        {showGptSearch && <select className='bg-gray-400 texts-white my-4 px-4 rounded-lg' onChange={handleLanguageChange}>
          {
            SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
            ))
          }
        </select>}
        <button className='py-2 px-4 mx-4 my-4 bg-red-800 text-white rounded-lg' onClick={handleGptSearchClick}>
          {showGptSearch ? "Home" : "GPT Search"}
        </button>
        <img className = "w-10 h-9 my-4 mx-4"  alt='userLogo' src={user?.photoURL}/>
        <button onClick= {handleSignOut} className='font-bold text-white bg-red-800 cursor-pointer my-4 px-4 rounded-lg'>(Sign Out)</button>
      </div>}
    </div>

  )
}

export default Header
