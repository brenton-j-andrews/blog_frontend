import React from "react";

const PostUnit = ({ post, selectPost }) => {

    return (
        <div className="post-display-unit">
            <h3> { post.title }</h3>
            <h6> Published by: { post.author.username } </h6>
            <button onClick={() => {selectPost(post)}}> View Post </button>
        </div>

    )
}

export default PostUnit;

