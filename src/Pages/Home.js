import React from "react";
import { useNavigate } from "react-router-dom";

// Import Bootstrap components.
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Home = ({ postData }) => {
    
    const navigate = useNavigate();

    function navigateToPost(post) {
        navigate(`/post/${post._id}`, { state : { id: post._id } });
    }

    return (
        <Container className="flex-column">
            <Row>
                {postData.map((post) => {
                    return (
                        <Col xs={12} md={4} 
                        className="m-4 p-5 border"
                        key={post._id} >
                            <h3 className="pb-2"> { post.title} </h3>
                            <h6 className="pb-2"> Published by: { post.author } </h6>
                            <Button onClick={() => {navigateToPost(post)}}> View Post </Button>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default Home;