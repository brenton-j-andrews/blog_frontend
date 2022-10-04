import axios from "axios";
import React, { useState } from "react";

const Post = ({ props }) => {

    let [ isDeleted, setIsDeleted ] = useState(false);


    const handleDeletion = () => {
        axios.delete(`http://localhost:3000/api/post/${props._id}/delete`)
        setIsDeleted(true);
    }

    return (
        
        <div>
            {!isDeleted && 
                <div className="post-content">
                    <p> Author: {props.author}</p>
                    <p> Title: {props.title} </p>
                    <p> {props.text} </p>

                    <a href="/"> Return Home </a>
                    <button onClick={() => {handleDeletion()}}> Delete post </button>
                </div>
            }

            {isDeleted &&
                <div className="post-content">
                    <p> Post has been deleted.</p>
                    <p> Click <a href="/">Here</a> to return home.</p>
                </div>
            }
        </div>     
    )
}

export default Post;