import React from "react";
import { useNavigate } from "react-router-dom";

// Import custom / Bootstrap components.
import Card from "react-bootstrap/Card";

// Import icons / images.
import like_icon from "../Assets/Icons/like.png";
import comment_icon from "../Assets/Icons/comment.png";


const Home = ({ postData, featuredPost }) => {
    
    const date_options = {
        month: "short",
        day: "numeric",
        year: "numeric"
    }

    const navigate = useNavigate();
    
    function navigateToPost(post) {
        navigate(`/post/${post._id}`, { state : { id: post._id } });
    }

    return (
        <div className="container-fluid d-flex flex-column align-items-center">
            <h3 className="display-5"> Trending Now: </h3>

            <div className="container-fluid d-flex justify-content-center row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-3">
                

                {postData.map((post, index) => {

                    return (                                    
                        <div className="col my-3" key={index}>
                            <Card className="container-fluid" onClick={() => {navigateToPost(post)}}>
                                <Card.Body>
                                    <Card.Title className="d-flex justify-content-center"> { post.title } </Card.Title>
                                    <Card.Subtitle className="d-flex justify-content-center mb-2 mt-1 text-muted"> { post.description }</Card.Subtitle>
                                    <Card.Subtitle className="d-flex justify-content-center mt-5 mb-2"> 
                                        <img className="card-icon" src={like_icon} alt=""></img> 
                                        &nbsp;&nbsp; 
                                        <img className="card-icon" src={comment_icon} alt=""></img>
                                    </Card.Subtitle>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-center text-muted"> By { post.author } &nbsp;&nbsp; {new Date(post.date).toLocaleDateString("en-US", date_options)} </Card.Footer>
                            </Card>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Home;