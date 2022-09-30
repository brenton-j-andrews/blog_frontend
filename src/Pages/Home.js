import React from "react";
import { useNavigate } from "react-router-dom";

import PostUnit from "../Components/PostUnit";

const Home = ({ postData }) => {
    

    const navigate = useNavigate();

    function navigateToPost(post) {
        navigate(`/post/${post._id}`, { state : { id: post._id } });
    }

    return (
        <div className="content-wrapper">
            <h1> My Blog! </h1> 
            <a href="/blog/new_post"> Create Post </a>

            <div className="post-display-wrapper">
                { postData.map((post, index) => {
                    return (
                        <PostUnit 
                        post = { post} 
                        selectPost = { navigateToPost }
                        key = { post._id }
                        />
                    )
                })}
            </div>
            
        </div>
    )
}

export default Home;