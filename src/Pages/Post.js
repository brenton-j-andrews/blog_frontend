import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import custom / Bootstrap components.
import CreatePost from "./CreatePost";
import CommentForm from "../Components/CommentForm";

import Button from "react-bootstrap/Button";

// Import icons / images.
import like_icon from "../Assets/Icons/like.png";
import comment_icon from "../Assets/Icons/comment.png";
import share_icon from "../Assets/Icons/share.png";

const Post = (props) => {

    const date_options = {
        month: "short",
        day: "numeric",
        year: "numeric"
    }

    const [ editMode, setEditMode ] = useState(false);
    const [ comments, setComments ] = useState([]);

    // Fetch post comments.
    useEffect(() => {
        axios.get(`http://localhost:3000/api/post/${props.post._id}/comments`)
            .then(res => {
                setComments(res.data);
            })
    }, [props.post._id])


    const navigate = useNavigate();

    const toggleEditMode = () => setEditMode(!editMode);

    const deletePost = () => {

        axios.delete(`http://localhost:3000/api/post/${props.post._id}/delete`)
        
            .then(() => {

                const updatedPostData = props.postData.filter(post => post._id !== props.post._id);
                props.setPostData(updatedPostData);

                props.setShowToast(true);
                props.setToastText(`Post "${props.post.title}" has been deleted.`);
                navigate("/");
            })

            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="post-wrapper">
            {
                editMode ? 
            
                <div>
                    <CreatePost
                    post={props.post}
                    toggleEditMode={toggleEditMode}
                    postData={props.postData}
                    setPostData={props.setPostData}
                    setShowToast={props.setShowToast}
                    setToastText={props.setToastText}
                    ></CreatePost>
                </div>
                
                :
                
                <div className="post-content">
                    <h1> { props.post.title } </h1>
                    <h5 className="text-muted"> { props.post.description } </h5>
                                     
                    <div className="d-flex justify-content-between align-items-center mt-4"> 
                        <div > 
                            <p className="fw-bold my-0"> {props.post.author}</p>
                            <p className="text-muted my-0"> {new Date(props.post.date).toLocaleDateString("en-US", date_options)}</p>
                        </div>

                        <div> 
                            <Button variant="light" className="border border-dark mx-1">
                                <img className="post-icon" src={like_icon} alt=""></img> 
                            </Button>
                           
                           <Button variant="light" className="border border-dark mx-1">
                                <img className="post-icon" src={comment_icon} alt=""></img>
                           </Button>

                           <Button variant="light" className="border border-dark mx-1">
                                <img className="post-icon" src={share_icon} alt=""></img>
                           </Button>
                        </div>
                        
                    </div>
                   
                    {/* <p> {props.post.text} </p> */}

                    {/* <a href="/"> Return Home </a> */}


                    <div className="post-comments mt-5">
                        <h3> Comments </h3>
                        <CommentForm 
                        post={props.post}
                        comments={comments}
                        setComments={setComments}
                        ></CommentForm>
                    
                        {comments.map((comment) => {
                            return (
                                <div className="border m-2 p-3" key={comment._id}>
                                    <p> {comment.author} </p>
                                    <p> {comment.text} </p> 
                                </div>
                            )
                        })}
                    </div>
                </div>
                
            }
        
        </div>
    )
}

export default Post;

{/* <button onClick={deletePost}> Delete post </button>
<button onClick={toggleEditMode}> Edit post </button>  */}