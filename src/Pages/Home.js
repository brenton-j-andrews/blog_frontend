import React from "react";
import { useNavigate } from "react-router-dom";
import  Button from 'react-bootstrap/Button';


import PostPreview from "../Components/PostPreview";

const Home = ({ postData }) => {
    

    const navigate = useNavigate();

    function navigateToPost(post) {
        navigate(`/post/${post._id}`, { state : { id: post._id } });
    }

    return (
        <div className="content-wrapper">
            <h1> My Blog!!! </h1> 
            
            <a href="/post/create_post"> Create Post </a>

            <div className="post-display-wrapper">
                { postData.map((post) => {

                    return (
                        <PostPreview 
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