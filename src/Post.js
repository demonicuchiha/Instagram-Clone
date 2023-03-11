import React, {useState, useEffect} from 'react';
import "./Post.css"
import Navbar from './Navbar';
import h7 from "./images/h7.png"
import M from 'materialize-css'
import { useNavigate} from "react-router-dom"



   
    
const Post = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")

  //setUrl is async function and takes a lot of time
  //posting image to cloudinary (first fetch) also takes a lot of time
  //so we used useeffect so second fetch waits for first fetch to complete n basis of url
  //useeffect will run the code only after url is changed which is after setUrl
  useEffect(()=>{

    //if condition so that useeffect only runs after change in url and not when compoennt is mounted
    if(url)
    {

      //neywork req to server to post the whole "Post data"

  fetch("http://localhost:5000/createpost",
  {
  method:"post",
  headers:{
      "Content-Type": "application/json",
      "Authorization":"Bearer "+localStorage.getItem("jwt")
  },
  body:JSON.stringify({
      title,
      body,
      pic:url
  })
  }).then(res=>res.json())
  .then(data=>{

      console.log(data)
      if(data.error){
          M.toast({html:data.error, classes:"#c62828 red darken-3"})
      }
      else{
          M.toast({html:"Created post Sucessfully", classes:"#43a047 green darken-1"})
         //navigate to interface
          navigate('/interface')
      }
  }).catch(err=>{
      console.log(err)
  })

}

  }, [url])   //url is dependency array

  const postDetails=()=>{
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "dgif9lsii")
    //network request
    fetch("https://api.cloudinary.com/v1_1/dgif9lsii/image/upload",{
    method:"post",
    body:data
  })
  .then((res)=>res.json())
  .then((data)=>{
    setUrl(data.url)
  })
  .catch((err)=>{
    console.log(err)
  })


  }
  return(
        <div> 
          <Navbar/>
          <img className="post-attacker" src={h7} alt="attacker.png"></img>
        <div className="mypostcard">
          
            <div className="card auth-post-card">

            <h3 className="post-hoho">Create your post :)</h3>

                <label className="post-label">Title</label>
                <input className="post-input" 
                type="text"
                placeholder="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}

                />
                <br></br>
                <br></br>

                <label className="post-label">Body</label>
                <input className="post-input" 
                type="text"
                placeholder="body"
                value={body}
                onChange={(e)=>setBody(e.target.value)}

                />

                <br></br>
                <br></br>
            
                <label className="post-label">File</label>
                <input className="post-input" 
                type="file"
                placeholder="Upload Image"
                onChange={(e)=>setImage(e.target.files[0])}

                />

                <br></br>
                <br></br>
                <button className="btn waves-effect waves-light post-but"
                onClick={()=>postDetails()}>
                    SUBMIT POST
                </button>


            </div>
        </div>
        </div>
       
        )
    }


export default Post