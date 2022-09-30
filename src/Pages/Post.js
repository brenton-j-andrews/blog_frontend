import React from "react";


const Post = ({ props }) => {

    return (
        <div>
            <p> Author: {props.author.username}</p>
            <p> Title: {props.title} </p>
            <p> {props.postContent} </p>
            <a href="/blog"> Return Home </a>
        </div>     
    )
}

export default Post;