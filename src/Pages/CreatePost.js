import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const CreatePost = (props) => {

    const navigate = useNavigate();

    const [ errorArray, setErrorArray ] = useState([]);
    const [ showErrorAlert, setShowErrorAlert ] = useState(false);
    const [ formData, setFormData ] = useState({
        title : props.post ? props.post.title : "",
        author: props.post ? props.post.author : "",
        description: props.post ? props.post.description : "",
        text: props.post ? props.post.text : ""
    })
    

    // Handles post request for new posts.
    const handleNewPost = async (e) => {
        e.preventDefault();

        const header = { 'Content-Type': 'application/json' }

        axios.post("http://localhost:3000/api/post/create_post", formData, header)
        .then( function(response) {
            props.setPostData((prevState) => [...prevState, response.data]);
            props.setToastText("New post successfully created.");
            props.setShowToast(true);
            navigate(`/post/${response.data._id}`);
        })
        .catch(function(error) {
            const error_messages = Array.from(error.response.data.errors);
            setErrorArray([...error_messages]);
            setShowErrorAlert(true);
        }) 
    }

    // Handles post request for updating existing posts.
    const handleUpdatePost = (e) => {
        e.preventDefault();

        console.log(props.postData);
        const header = { 'Content-Type': 'application/json' }

        axios.post(`http://localhost:3000/api/post/${props.post._id}`, formData, header)
        .then( function(response) {
            props.setShowToast(true);
            props.setToastText(`Post has been updated.`);
            props.toggleEditMode(false);

            // Update postData array... Might be a better way to achieve this?
            for (const post of props.postData) {
                if (post._id === props.post._id) {
                    post.title = formData.title;
                    post.author = formData.author;
                    post.text = formData.text;
                    break;
                }
            }

            navigate(`/post/${response.data._id}`);
        })
        .catch(function(error) {
            const error_messages = Array.from(error.response.data.errors);
            setErrorArray([...error_messages]);
            setShowErrorAlert(true);
        }) 
    }

    // Handles form value changes.
    const handleChange = (e) => {
    
        let name = e.target.id;
        let value = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }

    const handleNavigate = (e) => {
        props.post ? props.toggleEditMode(false) : navigate('/');
    }

    return (

        <div>
            <Button onClick={handleNavigate}> {props.post ? "Return to Post" : "Return Home"} </Button>
            
            <Form onSubmit={props.post ? handleUpdatePost : handleNewPost }>
                
                <Form.Group className="m-0" controlId="author">
                    <Form.Label> Author Name </Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter author name" 
                    value={formData.author}
                    onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="title">
                    <Form.Label> Post Title </Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter post title" 
                    value={formData.title}
                    onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label> Post Description </Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter post title" 
                    value={formData.description}
                    onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="text">
                    <Form.Label> Post Content </Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={10} 
                    placeholder="Enter post content"
                    value={formData.text}
                    onChange={handleChange}
                    />
                </Form.Group>
            
                <Button type="submit"> {props.post ? "Submit Edit" : "Add Post"} </Button>
            </Form> 
           

            {/* Dismissable alert box for validation errors. */}
            {showErrorAlert &&
                <Alert variant="danger" onClose={() => setShowErrorAlert(false)} dismissible>
                    <Alert.Heading> Fix the errors listed below and resubmit. </Alert.Heading>
                    {errorArray.map((error, index) => {
                        return (
                            <p key={index}> {error.msg} </p>
                        )
                    })}
                </Alert>
            }

        </div>
    )
}

export default CreatePost;