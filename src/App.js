import './App.css';

//useReducer is like a hook , when state changes page re-renders
//we use usereducer hook with context
import React,{useEffect, createContext, useReducer, useContext} from 'react';
import Post from './Post';
import {BrowserRouter} from 'react-router-dom';
import {Routes} from 'react-router-dom';
import { Route} from 'react-router-dom';
import Signup from './Signup';
import SignIn from './SignIn';
import Interface from './Interface'
import Profile from './Profile'
import { useNavigate } from 'react-router-dom';
import {reducer,initialState } from './reducers/userReducer';
import UserProfile from './UserProfile'
import Reset from './Reset'
import Ransomware from './Ransomware';

import Firstscreen from './Firstscreen';

//import Home from './Home';

import Mainmenu from "./Mainmenu" ;             //use this for final version
import { Home } from '@material-ui/icons';
//import Intro from './Intro';


//import Profile from './Profile'


export const UserContext = createContext()


//created a routing component to use navigation because it needs to be wrapped in browser-router where all components are wrapped
//bcz usenavigate makes us eof components
const Routing = ()=>{

  const navigate = useNavigate()
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){

      dispatch ({type:"USER", payload:user})

    }
    else{
      //push him to login screen
    //  if(!history.location.pathname.startswith('/reset-password'))
    //  navigate('/signin')
    }
  }, [])
  return(

  <Routes>
  <Route exact path="/" element={<Firstscreen/>}></Route>
      <Route exact path="/signup" element={<Signup/>}></Route>
      <Route exact path="/signin" element={<SignIn/>}></Route>
      <Route exact path="/interface" element={<Interface/>}></Route>
      <Route exact path="/create" element={<Post/>}></Route>
      <Route exact path="/profile" element={<Profile/>}></Route>
      <Route exact path="/profile/:userid" element={<UserProfile/>}></Route>
      <Route exact path="/reset" element={<Reset/>}></Route>
      <Route exact path="/ransomware" element={<Ransomware/>}></Route>
      <Route exact path="/main" element={<Mainmenu/>}></Route>
    </Routes>

  )

}
function App() {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (

  <div className="App">
<UserContext.Provider value = {{state, dispatch}}>
<BrowserRouter>
  
      <Routing/>


</BrowserRouter>
</UserContext.Provider>
    </div>

   
  );
}

export default App;
