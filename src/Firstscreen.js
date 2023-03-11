import React, {useState, useEffect} from 'react'
import h4 from './images/h4.png'
import "./Firstscreen.css"
import { useNavigate } from 'react-router-dom';
import Mainmenu from './Mainmenu';

//navigate('/main')
const Firstscreen = () => {

  let navigate = useNavigate();
  const [showComponent, setShowComponent] = useState(false);
  
  useEffect(()=>{

    setInterval(() => {
      setShowComponent(true);
    }, 4000);
  },[])
  
  
  return (
    <div className="firstscreen">

    {showComponent && navigate('/main')}

      <div className="hacker_img">
      <img  className="img_width" src={h4} alt="hacker"></img>
      </div>

      <h5 className='initial_loading'>Loading . . . . . </h5>

      

      
    </div>
  )
}

export default Firstscreen
