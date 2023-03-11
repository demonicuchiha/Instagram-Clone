import React from 'react'
import './Intro.css';
import logo from "./images/new_logo.png"
import attacker from "./images/h7.png";

const Intro = () => {
  return (
    <div>
    <div className='box'>
      <img className="logo" src={logo} alt="logo.png"></img>
    </div>

    <div >
        <img className="attacker" src={attacker} alt="attacker.png"></img>
    </div>

    <div className='textarea'>
        <h3>Hello Fellas, My name is Hell.</h3>
        <h3>One wrong move and I will come for you!</h3>
        <h3>So let's dive in.....</h3>
    </div>

    </div>
  )
}

export default Intro
