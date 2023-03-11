import React,{useState} from 'react';
//import {Button} from "@material-ui/core";

function ImageUpload() {
    const [ setImage] = useState(null);
    //const [progress]=useState(0);
    const [ setCaption] = useState('');


    const handleChange=(e)=>{
        /*get the first fell you slected, not many*/
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {

    }
  return (
    
    <div className="imageupload">
       {/*Caption input, file picker, post button*/}

       <input type="text" placeholder="Enter a caption..." onChange={event=>setCaption(event.target.value)} value></input>
       <input type="file" onChange={handleChange}></input>
        <button className="imageupload__button" onClick={handleUpload}>
            Upload 
        </button>
    
    </div>
  )
}

export default ImageUpload
