import React, {useState, useEffect} from 'react';
import "./Signup.css"
import img1 from './images/child_with_parent.jpg'
import logo from "./images/new_logo.png"
import {Link, useNavigate} from "react-router-dom"
import M from 'materialize-css'
import Navbar from './Navbar'

//res=>res.json() ==== converting response to response.json
//JSON.stringify  ==== body needs to be converted to json string

const Signup = () => {
const navigate = useNavigate()
const [name, setName] = useState("")
const [password, setPassword] = useState("")
const [email, setEmail] = useState("")
const [image, setImage]= useState("")

//undefined means uf no pic is uploaded by user, default will be used
const [url, setUrl] = useState(undefined)


useEffect(()=>{

    if(url){

        uploadFields()
    }
},[url])
const uploadPic = ()=>{
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

const uploadFields = ()=>{

    fetch("http://localhost:5000/signup",
    {
    method:"post",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify({
        name,
        password,
        email,
        pic:url
    })
    }).then(res=>res.json())
    .then(data=>{
        if(data.error){
            M.toast({html:data.error, classes:"#c62828 red darken-3"})
        }
        else{
            //regex to check email validity
  
            //add regex to check password
            if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                M.toast({html:"Inavlid Email", classes:"#c62828 red darken-3"})
                return 
            }
            M.toast({html:data.message, classes:"#43a047 green darken-1"})
            navigate('/signin')
        }
    }).catch(err=>{
        console.log(err)
    })

}





const PostData = ()=>{
 
    //if image is present, upload pic bcz uploading profile pic is optional

    if(image){
        uploadPic()
    }
    else{

        //upload other input fields only like name, password etc
        uploadFields()
    
    }

}
 
        return(
            <div>
            <Navbar/>
      
     <div className="mycard2">
         <div className="card auth-card">
         <img className="image" src={img1} alt="Child and Parent"></img>

             <h3 className="hoho1">Tell us more about yourself</h3>
             <label className="label">Username</label>
             <input className="input" 
             type="text"
             placeholder="name"
             value={name}
             onChange={(e)=>setName(e.target.value)}
             />
             <br></br>
             <br></br>


             <label className="label">Email</label>
             <input className="input" 
             type="text"
             placeholder="abc@gmail.com"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}

             />
             <br></br>
             <br></br>

             <label className="label">Password</label>
             <input className="input" 
             type="password"
             placeholder="password"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             
             />

            <br></br>
             <br></br>

                <label className="label">Upload Image</label>
                <input className="input" 
                type="file"
                placeholder="Upload Image"
                onChange={(e)=>setImage(e.target.files[0])}

                />

            <h5>
                <Link className="existing-account" to="/signin">Already have an account?</Link>
            </h5>
             <button className="btn waves-effect waves-light but2" 
             onClick={()=>PostData()}>
                 SIGN UP
             </button>



         </div>
     </div>
     </div>
    
        )
    }


export default Signup