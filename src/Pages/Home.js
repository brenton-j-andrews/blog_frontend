import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PostUnit from "../Components/PostUnit";

const Home = () => {
    let [ allPostData, setAllPostData ] = useState([]);

    const navigate = useNavigate();

    // Fetch summary data of all posts from DB.
    useEffect(() => {
        fetch("http://localhost:3000")
        .then( res => res.json())
        .then(
          (res) => {
              setAllPostData(res);
          }
        )
      }, []);


    function navigateToPost(post) {
        navigate(`/post/${post._id}`, { state : { id: post._id } });
    }

    return (
        <div className="content-wrapper">
            <h1> My Blog! </h1> 
            <a href="/blog/new_post"> Create Post </a>

            <div className="post-display-wrapper">
                { allPostData.map((post, index) => {
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