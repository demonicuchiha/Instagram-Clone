import React, {useEffect, useState, useContext} from 'react'
import img1 from './images/saira.jpg';
import "./Profile.css";
import {UserContext} from './App'
import Navbar from './Navbar'
import {useParams} from 'react-router-dom'
import './UserProfile.css';

//display flex is to make elements of div to align row wise
//justiy content: space between only works if width of elements is big enough

//add footer in the last ->remaining
const Profile = () => {
 
const [userProfile, setProfile] = useState(null)
const {state, dispatch} = useContext(UserContext)
const {userid} = useParams()
console.log(userid)

//we will see follow button for a second or two, then when state changes, it will be unfollow button
const [showfollow, setShowFollow] = useState(state? !state.following.includes(userid): true)

  useEffect(()=>{
    fetch(`http://localhost:5000/user/${userid}`,{
    headers:{
      "Authorization": "Bearer "+localStorage.getItem("jwt")
    }
    }).then(res=>res.json())
    .then(result=>{
      //result is array and mupost is key of array  
      console.log(result)
      setProfile(result)

    })
  }, [])
  //we are using [] empty dependency because we want use effect to work only once
  




  const followUser = ()=>{
    fetch("http://localhost:5000/follow",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        followId:userid
      })
      }).then(res=>res.json())
      .then(data=>{

        console.log(data)

        //change state when we click follow
        dispatch({type:"UPDATE", payload:{following:data.following, followers:data.followers}})
      //localstorage can only save strings
        localStorage.setItem("user", JSON.stringify(data))
        setProfile((prevState)=>{
          return{
            //spreading prev state of user
            //any object can be spread
            ...prevState,
            //updating user "user" with new data 
            user:{
              ...prevState.user,
              followers:[
                ...prevState.user.followers, data._id
              ]
            }
          }
        })
        setShowFollow(false)
      })
  }



  const unfollowUser = ()=>{
    fetch("http://localhost:5000/unfollow",{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        followId:userid
      })
      }).then(res=>res.json())
      .then(data=>{

        console.log(data)

        //change state when we click follow
        dispatch({type:"UPDATE", payload:{following:data.following, followers:data.followers}})
      //localstorage can only save strings
        localStorage.setItem("user", JSON.stringify(data))
        setProfile((prevState)=>{
          const newfollower = prevState.user.followers.filter(item=>item !== data._id)
          return{

            ...prevState,
            //updating user "user" with new data 
            user:{
              ...prevState.user,
              followers:newfollower
            }
          }
        })
        setShowFollow(true)
      })
  }
  
  
  return (

    <>

    {userProfile ?
     
     
  <div className="profile1">

  <Navbar/>
  <div className="profile_section">
      <div>
         <img src={userProfile.user.pic} alt="No Profile" className="profile__image"></img>
         <h4 className="profile__username"> {userProfile.user.name} </h4>
      </div>

      <div className="profile_details">
        <h5>{userProfile.posts.length} posts</h5>
        <h5>{userProfile.user.followers.length} followers</h5>
        <h5>{userProfile.user.following.length} following</h5>
        

      </div>

      {showfollow?
      
      <button className="btn waves-effect waves-light follow_button" 
      onClick={()=>followUser()}>
      Follow
      </button> :

<button className="btn waves-effect waves-light follow_button" 
onClick={()=>unfollowUser()}>
Unfollow
</button> 

    }


   
  </div>

  <div className="gallery">

    {
      userProfile.posts.map(item=>{
        return(    
        <img key={item._id} className="item" src={item.photo} alt={item.title} ></img>
        )
      })
    }


  </div>
</div>
     : <h2 className="loading">Loading...</h2>}

  
        
  </>
    
  )
}

export default Profile
