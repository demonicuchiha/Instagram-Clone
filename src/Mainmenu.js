import React from 'react'
import './Mainmenu.css';
import logo from "./images/new_logo.png"
import hi from "./images/hi.png"
import { useNavigate } from 'react-router-dom';

const Mainmenu = () => {

let navigate = useNavigate();
  return (
    <div className='mainmenu'>


      <div className='box'>
      <img className="logo" src={logo} alt="logo.png"></img>
      </div>

      <div className='box '>
        
      <h2 className="textarea">Learn Cybersecurity Through Real-World Attack Simulations</h2>
      </div>




    <div className='section hi_img'>
    <img className="hi" src={hi} alt="hi.png"></img>
    </div>
    <div className='section'>
    <div   className='menu'>
      <div className="start_buttons">
      <button  className="signup1" type="button" onClick={()=>navigate("/signup")}>Sign Up</button>
      </div>
      <div className="start_buttons">
      <button className="login1" type="button" onClick={()=>navigate("/signin")}>Login</button>
      </div>


    </div>
    </div>

    </div>
  )
}

export default Mainmenu
