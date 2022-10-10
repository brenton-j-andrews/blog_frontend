import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const CreatePost = ({ postData, setPostData }) => {

    const navigate = useNavigate();

    const [ errorArray, setErrorArray ] = useState([]);
    const [ showErrorAlert, setShowErrorAlert ] = useState(false);
    const [ formData, setFormData ] = useState({
        title : "",
        author: "",
        text: "",
    })
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const header = { 'Content-Type': 'application/json' }

        axios.post("http://localhost:3000/api/post/create_post", formData, header)
        .then( function(response) {
            setPostData((prevState) => [...prevState, response.data]);
            navigate(`/post/${response.data._id}`);
        })
        .catch(function(error) {
            const error_messages = Array.from(error.response.data.errors);
            setErrorArray([...error_messages]);
            setShowErrorAlert(true);
        }) 
  
        
    }

    const handleChange = (e) => {
    
        let name = e.target.id;
        let value = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }

    return (
        <div>
            <Button onClick={() => {navigate('/')}}> Return Home </Button>
            
            <Form onSubmit={handleSubmit}>
                
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
                
                <Button type="submit"> Add Post </Button>
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