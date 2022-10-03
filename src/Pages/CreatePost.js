import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title : "",
        author: "",
        text: "",
        message: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        const header = { 'Content-Type': 'application/json' }

        axios.post("http://localhost:3000/api/post/create_post", formData, header)
        .then( function(response) {
            navigate(`/post/${response.data._id}`);
        })
        .catch(function(error) {
            console.log(error)
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

                <div> { formData.message ? <p> {formData.message} </p> : null } </div>
            </form> 
        </div>
    )
}

export default CreatePost;