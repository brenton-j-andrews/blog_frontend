import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";


const CommentForm = (props) => {

    const navigate = useNavigate();

    const [ errorArray, setErrorArray ] = useState([]);
    const [ showErrorAlert, setShowErrorAlert ] = useState(false);
    const [ formData, setFormData ] = useState({
        author: "",
        text: "",
        postRef: props.post._id
    })

     // Handles post request for new comments.
     const handleNewComment = async (e) => {
        e.preventDefault();

        const header = { 'Content-Type': 'application/json' }

        axios.post(`http://localhost:3000/api/post/${props.post._id}/comments`, formData, header)
        .then( function(response) {

            props.setComments((prevState) => [...prevState, response.data]);
            navigate(`/post/${props.post._id}`);
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
    
    return (
        <div>
            <Form onSubmit={handleNewComment} >
                <Form.Group className="m-0" controlId="author">
                    <Form.Label> Commentor Name </Form.Label>
                    <Form.Control 
                    type="text" 
                    placeholder="Enter your name" 
                    value={formData.author}
                    onChange={handleChange}
                    />

                </Form.Group>

                <Form.Group className="mb-3" controlId="text">
                    <Form.Label> Comment: </Form.Label>
                    <Form.Control 
                    as="textarea" 
                    rows={10} 
                    placeholder="Add a comment!"
                    value={formData.text}
                    onChange={handleChange}
                    />
                </Form.Group>
            
                <Button type="submit"> Add Your Comment </Button>
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

export default CommentForm;