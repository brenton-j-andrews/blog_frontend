import React, { useState, useEffect } from "react";
import PostUnit from "../Components/PostUnit";

const Home = () => {
    let [ allPostData, setAllPostData ] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000")
        .then( res => res.json())
        .then(
          (res) => {

              setAllPostData(res);
          }
        )
      }, []);

    return (
        <div className="content-wrapper">
            <h1> My Blog! </h1> 
            <a href="/blog/new_post"> Create Post </a>

            <div className="post-display-wrapper">
                { allPostData.map((post, index) => {
                    return (
                        <PostUnit post = { post } />
                    )
                })}
            </div>
            
        </div>
    )
}

export default Home;