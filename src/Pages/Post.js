import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Post = (props) => {

    const navigate = useNavigate();
    let [ isDeleted, setIsDeleted ] = useState(false);

    const handleDeletion = () => {
        axios.delete(`http://localhost:3000/api/post/${props.post._id}/delete`)
        setIsDeleted(true);
    }

    const testHandleDeletion = () => {
        props.setShowToast(true);
        props.setToastText(`Post "${props.post.title}" has been deleted.`);
        navigate("/");
    }

    return (
        
        <div>
            <button onClick={testHandleDeletion}> Test Buttron </button>

            {!isDeleted && 
                <div className="post-content">
                    <p> Author: {props.post.author}</p>
                    <p> Title: {props.post.title} </p>
                    <p> {props.post.text} </p>

                    <a href="/"> Return Home </a>
                    <button onClick={() => {handleDeletion()}}> Delete post </button>
                    <button onClick={() => {handleDeletion()}}> Update post </button>

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