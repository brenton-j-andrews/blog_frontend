import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CreatePost from "./CreatePost";
import CommentForm from "../Components/CommentForm";

const Post = (props) => {

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
                    <p> Author: {props.post.author}</p>
                    <p> Posted on {new Date(props.post.date).toLocaleDateString("en-US")}</p>
                    <p> Title: {props.post.title} </p>
                    <p> {props.post.text} </p>

                    <a href="/"> Return Home </a>
                    <button onClick={deletePost}> Delete post </button>
                    <button onClick={toggleEditMode}> Edit post </button>

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