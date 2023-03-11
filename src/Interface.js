import React, {useState, useEffect, useContext} from 'react'
import './Interface.css';
import h7 from './images/h7.png';
import Navbar from './Navbar';
import {UserContext} from './App'
import {Link} from 'react-router-dom'
//min-content->the smallest width of a box where the box's contents don't overflow the box itself.

//import TextField from "@mui/material/TextField";
//import search from "./images/search.png"

//we are using context to get the user who is logged in

const Interface = () => {
    const [data, setData] = useState([])

    //state has details of logged in user
    const {state, dispatch}= useContext(UserContext)

    useEffect(()=>{
        fetch("http://localhost:5000/allpost",{
            headers:{
                "Authorization": "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{

            setData(result.posts)
        })
    },[])

    const likePost = (id)=>{
        fetch("http://localhost:5000/like",{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(item._id==result._id){   //it means if id of post is equal , return updated record, else return old record
                    return result
                } 
                else{
                    return item
                }
               })
               setData(newData)
    }).catch(err=>{
        console.log(err)
    })

}

    const unlikePost = (id)=>{
        fetch("http://localhost:5000/unlike",{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
           // console.log(result)
           //new data array and map it on existing array
           const newData = data.map(item=>{
            if(item._id==result._id){   //it means if id of post is equal , return updated record, else return old record
                return result
            } 
            else{
                return item
            }
           })
           setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    
    }

    const makeComment = (text, postId)=>{
        fetch("http://localhost:5000/comment",{
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){   //it means if id of post is equal , return updated record, else return old record
                    return result
                } 
                else{
                    return item
                }
               })

               setData(newData)
        }).catch(err=>{
            console.log(err)
        })
    
    }


    const deletePost=(postid)=>{
        fetch(`http://localhost:5000/deletepost/${postid}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("jwt")

            }

        }).then(res=>res.json()
        .then(result=>{
            console.log(res)
            //filter out deleted record by 
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        }))
    }



    return(

        <div>

        <Navbar/>

        <div className="interface">

            {
                data.map(item=>{
                    return(
                        <div className="card interface-card" key={item._id}>
                        <h5 className="interface-text"><Link class='link' to={item.postedBy._id !== state._id ? "/profile/"+item.postedBy._id : "/profile"}>{item.postedBy.name}</Link>
                        {item.postedBy._id == state._id
                        && 
                        <i className="material-icons del"
                        onClick={()=>deletePost(item._id)} >delete</i>
                }       </h5>
                        <div className="card-image">
                             <img className="image-styling" height="400px" width="500px"  src={item.photo} alt="girl"></img>
                         </div>
                         <div className="card-content">
                         <i class="material-icons iconic" style={{color:"red"}}>favorite</i>
                         
                         
                         {item.likes.includes(state._id)
                         ?
                          <i class="material-icons iconic" style={{color:"white"}}
                          onClick={()=>{unlikePost(item._id)}}>thumb_down</i>
                        :
                        <i class="material-icons iconic" style={{color:"white"}} 
                        onClick={()=>{likePost(item._id)}}>thumb_up</i>
                         }

                        


                         <h4 className="likes_count">{item.likes.length} likes</h4>
                         <div className="post-text">

                          <h4 className='user-name'>{item.title}   <span className="caption"> {item.body} </span></h4>
                        

                          
                        </div>
                        {
                            item.comments.map(record=>{
                                return(
                                    <h4 key={record._id} className="posted_by">{record.postedBy.name}<span className="posted_comment">{record.text}</span></h4>
                                )
                            })
                           }
                        <form onSubmit={(e)=>{
                            e.preventDefault()
                            makeComment(e.target[0].value, item._id)
                        }}>
                             <input className="comment" type="text" placeholder="Add a comment"></input>
                        </form>


                         </div>
                     </div>
                    )
                })
            }



        </div>

        </div>
    )
}
export default Interface
