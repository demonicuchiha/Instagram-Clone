import React, {useEffect, useState, useContext} from 'react'
import img1 from './images/saira.jpg';
import "./Profile.css";
import {UserContext} from './App'
import Navbar from './Navbar'

//display flex is to make elements of div to align row wise
//justiy content: space between only works if width of elements is big enough

//add footer in the last ->remaining
const Profile = () => {
const [mypics, setPics] = useState([])
const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    fetch("http://localhost:5000/mypost",{
    headers:{
      "Authorization": "Bearer "+localStorage.getItem("jwt")
    }
    }).then(res=>res.json())
    .then(result=>{
      //result is array and mupost is key of array
      console.log(result)
      setPics(result.mypost)
    })
  }, [])
  //we are using [] empty dependency because we want use effect to work only once
  
  
  const updatePhoto = ()=>{

  }
  
  
  
  return (


  
  <div className="profile1">

    <Navbar/>
    <div className="profile_section">
        <div>
           <img src={state?state.pic:"loading"} alt="saira.jpg" className="profile__image"></img>
           <h4 className="profile__username"> {state?state.name:"loading"} </h4>

           <button className="btn waves-effect waves-light update_pic" 
        onClick = {()=>{
          updatePhoto()
        }}
        >
        UPDATE PIC
        </button>
        </div>

  


        <div className="profile_details">
          <h5>{mypics.length} posts</h5>
          <h5>{state?state.followers.length:"0"} followers</h5>
          <h5>{state?state.following.length:"0"} following</h5>
          

        </div>

 
    </div>

    <div className="gallery">

      {
        mypics.map(item=>{
          return(    
          <img key={item._id} className="item" src={item.photo} alt={item.title} ></img>
          )
        })
      }


    </div>
  </div>
        

    
  )
}

export default Profile
