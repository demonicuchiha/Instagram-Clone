import React, { useContext } from 'react'
import logo from "./images/new_logo.png"
import './Navbar.css';
import {Link} from 'react-router-dom'
import {UserContext} from './App'
import { useNavigate } from 'react-router-dom';




const Navbar = () => {
  let navigate = useNavigate();

const {state, dispatch} = useContext(UserContext)
const renderList = ()=>{

  if(state){
    return [
      <li><Link className='link' to="/ransomware">Ransomware</Link></li>,
      <li><Link  className='link' to="/create">Create Post</Link></li>,
      <li><Link  className='link' to="/interface">Interface</Link></li>,
      <li><Link className='link' to="/profile">Profile</Link></li>,
      <li >
        <button className="btn logout-but"
          onClick={()=>{
            localStorage.clear()
//dispatch sets action type clear
            dispatch({type:"CLEAR"})
            navigate("/signin")
          }}
          >
            Logout
        </button>
      </li>
    ]
  }
  else{

    return [
      <li><Link className='link' to="/signin">Login</Link></li>,
      <li><Link  className='link' to="/signup">Signup</Link></li>
    ]

  }

}
  return (
    <div className='Navbar'>
    <nav >
      <div className="nav-logo">
      <img className="nav-logo" src={logo} alt="logo.png"></img> 
      </div>


      
      <div className="nav">
      <ul className="navbar-links">


      {renderList()}

      </ul> 
         
      </div>
      </nav>
    </div>
  )
}

export default Navbar
