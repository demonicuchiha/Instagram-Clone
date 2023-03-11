import React, { useState, useContext} from 'react';
import "./SignIn.css"
import img1 from './images/happy_kids.jpg'
import logo from "./images/new_logo.png"
import {Link, useNavigate} from "react-router-dom"
import M from 'materialize-css'

import Navbar from './Navbar'


   
    
const Reset = () => {



const navigate = useNavigate()

const [email, setEmail] = useState("")
const PostData = ()=>{
 
    fetch("http://localhost:5000/reset",
    {
    method:"post",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify({
        email
    })
    }).then(res=>res.json())
    .then(data=>{

        console.log(data)
        if(data.error){
            M.toast({html:data.error, classes:"#c62828 red darken-3"})
        }
        else{

            //save token and user details to local storage
            //stringify objects data.token and data.user bcz in localstorage, there are only strings
            //jwt and user are just random names

            //regex to check email validity
  
            //add regex to check password


            if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                M.toast({html:"Inavlid Email", classes:"#c62828 red darken-3"})
                return 
            }

            M.toast({html:data.message, classes:"#43a047 green darken-1"})
           //navigate to interface
            navigate('/signin')
        }
    }).catch(err=>{
        console.log(err)
    })
}
 
        return(
        <div>
            <Navbar/>
        <div className="mycard">
            <div className="card auth-card">
            <img className="image" src={img1} alt="Child and Parent"></img>

                <h3 className="hoho">Login and Enjoy !</h3>
                <label className="label1">Email</label>
                <input className="input1" 
                type="text"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}

                />
                <br></br>
                <br></br>

  
                <h5>
                <Link className="non-existing-account" to="/signup">Don't have an account?</Link>
            </h5>
                <button className="btn waves-effect waves-light but" 
                onClick={()=>PostData()}>
                    RESET PASSWORD
                </button>

            </div>
        </div>
        </div>
       
        )
    }


export default Reset