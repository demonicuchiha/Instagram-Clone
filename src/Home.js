import React,{useState} from 'react'
import img1 from './images/logo.png';
import "./Home.css"
import Post from './Post'
import ImageUpload from './ImageUpload'
//import Login from './Login';
//import Signup from './Signup';
//import Profile from './Profile';



//import {db} from './Firebase';
//import img1 from './images/seaside.jpg';
//import img1 from './images/happy_kids.jpg'

const Home = () => {

  //const [isToggled, setIsToggled]=useState(false);
  const [posts] = useState([

    {username:"Huma Ahmed",
     caption:"Wow it works",
    imageUrl:"https://wallpapercave.com/wp/wp2412251.png"
    },

    {username:"Sohaib",
    caption:"Hello World!",
   imageUrl:"https://th.bing.com/th/id/R.e50309c55ac9f4f8107b2e0b1b01263b?rik=zJ8f%2bHM8psr1pA&riu=http%3a%2f%2favante.biz%2fwp-content%2fuploads%2fNature-sunshine-wallpaper%2fNature-sunshine-wallpaper58.jpg&ehk=pAfV3nT4Zrhijiw2oxr31Z3jLC2%2bhSozbaf%2beEYT%2fGE%3d&risl=&pid=ImgRaw&r=0"
    }

  ]);


  //runs when a specific condition is met
  //this will run everytime whena post changes
/*useEffect(()=>{

db.collection['posts'].onSnapshot(snapshot=>{
  //every time a new post is added, this code will run

setPosts(snapshot.docs.map(doc=>doc.data()));

})

}, []);//[] -> for condition*/





  return (
    <div className="home">
        {/* Navbar */}
        
        <div className="logo">
   <img src={img1} alt="logo.png"></img>
        <div className="navbar_items">
        <button href="#" className="home1">HOME</button>
       
        <button className="signup">SIGN UP</button>
        <button className="signin ">LOGIN</button>
        </div>

        </div>
        
        <div className="app__header">
            <div className="app__headerImage">


           </div>
        </div>

        {
          posts.map(post=>
            (
            <Post username={post.username}  
            caption={post.caption}
            imageUrl={post.imageUrl}></Post>     
            ))
        }

        {/*Caption input, file picker, post button*/}
<div className='imageupload'>
        <ImageUpload/>
        </div>

    </div>
  )
}

export default Home
