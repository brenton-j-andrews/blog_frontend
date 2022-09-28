import React from "react";

const PostUnit = ({ post }) => {
    return (
        <div className="post-display-unit">
            <h3> { post.title }</h3>
            <h6> Published by: { post.author.username } </h6>
        </div>

    )
}

export default PostUnit;

