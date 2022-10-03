import React from "react";


const Post = ({ props }) => {

    return (
        <div>
            <div className="post-content">
                <p> Author: {props.author}</p>
                <p> Title: {props.title} </p>
                <p> {props.text} </p>
            </div>

            <a href="/"> Return Home </a>
        </div>     
    )
}

export default Post;