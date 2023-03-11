import React, { useState, useContext} from 'react';
import "./SignIn.css"
import img1 from './images/happy_kids.jpg'
import logo from "./images/new_logo.png"
import {Link, useNavigate} from "react-router-dom"
import M from 'materialize-css'

import {UserContext} from './App'
import Navbar from './Navbar'


   
    
const SignIn = () => {


const {state, dispatch} = useContext(UserContext)
const navigate = useNavigate()
const [password, setPassword] = useState("")
const [email, setEmail] = useState("")
const PostData = ()=>{
 
    fetch("http://localhost:5000/signin",
    {
    method:"post",
    headers:{
        "Content-Type": "application/json"
    },
    body:JSON.stringify({
        password,
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
            localStorage.setItem("jwt", data.token) //token already a string
            localStorage.setItem("user", JSON.stringify(data.user))
            //regex to check email validity
  
            //add regex to check password

            dispatch({type:"USER", payload:data.user})
            if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                M.toast({html:"Inavlid Email", classes:"#c62828 red darken-3"})
                return 
            }

            M.toast({html:"Signedin Sucessfully", classes:"#43a047 green darken-1"})
           //navigate to interface
            navigate('/interface')
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

                <label className="label1">Password</label>
                <input className="input1" 
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}

                
                />
                <h5>
                <Link className="non-existing-account" to="/signup">Don't have an account?</Link>
            </h5>
                <button className="btn waves-effect waves-light but" 
                onClick={()=>PostData()}>
                    LOGIN
                </button>

            </div>
        </div>
        </div>
       
        )
    }


export default SignIn