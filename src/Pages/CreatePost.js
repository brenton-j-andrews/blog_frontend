import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

    const navigate = useNavigate();

    const [ errorArray, setErrorArray ] = useState([]);
    const [formData, setFormData] = useState({
        title : "",
        author: "",
        text: "",
    })
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const header = { 'Content-Type': 'application/json' }

        axios.post("http://localhost:3000/api/post/create_post", formData, header)
        .then( function(response) {
            navigate(`/post/${response.data._id}`);
        })
        .catch(function(error) {
            const error_messages = Array.from(error.response.data.errors);
            setErrorArray([...error_messages]);
        }) 
  
        
    }

    const handleChange = (e) => {
        
        let { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name] : value
        }))
    }


    return (
        <div>
            <a href="/"> Return home </a>
            <p> This is the new post page! Fill out the form below... </p>

            <form onSubmit={handleSubmit}>
                
                <label>
                    Name:
                    <input 
                        type="text"
                        name="author"
                        value= {formData ? formData.name : ""}
                        onChange={handleChange}
                    />
                </label>    

                <label>
                    Post Title:
                    <input 
                        type="text"
                        name="title"
                        value={formData ? formData.title : ""}
                        onChange={handleChange}
                    />
                </label>    
                <label>
                    Post Text:
                    <textarea 
                        type="text"
                        name="text"
                        value={formData ? formData.text : ""}
                        onChange={handleChange}
                    />  
                </label>    

                <input type="submit" value="Add Post"/>
            </form> 

            <div>
                {errorArray.length !== 0 &&
                    <div>
                        <p> Errors: </p>
                        {errorArray.map((error, index) => {
                            return (
                                <p key={index}> {error.msg} </p>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

export default CreatePost;