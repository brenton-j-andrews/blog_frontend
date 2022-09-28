import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const Post = () => {
    
    const { id } = useParams();

    let [ postId, setPostId ] = useState(id);  
    let [ postData, setPostData ] = useState({});

    console.log("post id: " + postId);
    // Fetch summary data of all posts from DB.
    useEffect(() => {
        fetch(`http://localhost:3000/api/post/${id}`)
        .then( res => res.json())
        .then(
          (res) => {
              console.log(res);
              setPostData(res);
          }
        )
      }, []);

      console.log(postData);
    return (
        <div>
            Test!
            {postData !== {} &&
                <div className="post-body">
                    <h2> { postData.title } </h2>
                    <p> By { postData.author.username } </p> 
                    <a href="/blog"> Return home</a>
                </div>
                
            }
        </div>
        
    )
}

export default Post;