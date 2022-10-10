import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Post = (props) => {

    const navigate = useNavigate();

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
        <div className="post-content">
            <p> Author: {props.post.author}</p>
            <p> Title: {props.post.title} </p>
            <p> {props.post.text} </p>

            <a href="/"> Return Home </a>
            <button onClick={deletePost}> Delete post </button>
            {/* <button onClick={() => {handleDeletion()}}> Update post </button> */}

        </div>
    )
}

export default Post;