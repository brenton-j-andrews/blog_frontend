import React, { useState, useEffect } from "react";
import PostUnit from "../Components/PostUnit";

const Home = () => {
    let [ postData, setPostData ] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000")
        .then( res => res.json())
        .then(
          (res) => {
            setPostData(res);
          }
        )
      }, []);

    return (
        <div className="content-wrapper">
            <h1> My Blog! </h1> 
            <a href="/new_post"> Create Post </a>

            <div className="post-display-wrapper">
                { postData.map((post) => {
                    return (
                        <PostUnit post = { post } />
                    )
                })}
            </div>
            
        </div>
    )
}

export default Home;