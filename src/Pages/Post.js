import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CreatePost from "./CreatePost";

const Post = (props) => {

    const [ editMode, setEditMode ] = useState(false);


    const navigate = useNavigate();

    const toggleEditMode = () => setEditMode(!editMode);

    const deletePost = () => {

        axios.delete(`http://localhost:3000/api/post/${props.post._id}/delete`)
        
            .then(() => {

                const updatedPostData = props.postData.filter(post => post._id !== props.post._id);
                props.setPostData(updatedPostData);

                props.setShowToast(true);
                props.setToastText(`Post "${props.post.title}" has been deleted.`);
                navigate("/");
            })

            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            {
                editMode ? 
            
                <div>
                    <CreatePost
                    post={props.post}
                    toggleEditMode={toggleEditMode}
                    postData={props.postData}
                    setPostData={props.setPostData}
                    setShowToast={props.setShowToast}
                    setToastText={props.setToastText}
                    ></CreatePost>
                </div>
                
                :
                
                <div className="post-content">
                    <p> Author: {props.post.author}</p>
                    <p> Title: {props.post.title} </p>
                    <p> {props.post.text} </p>

                    <a href="/"> Return Home </a>
                    <button onClick={deletePost}> Delete post </button>
                    <button onClick={toggleEditMode}> Edit post </button>
                </div>
                
            }
        
            </div>
    )
}

export default Post;