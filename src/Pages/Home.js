import React from "react";
import { useNavigate } from "react-router-dom";

// Import custom / Bootstrap components.
// import Container from "react-bootstrap/Container";
// import { Row, Col } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";


const Home = ({ postData }) => {
    
    const navigate = useNavigate();
    
    function navigateToPost(post) {
        navigate(`/post/${post._id}`, { state : { id: post._id } });
    }

    return (
        <div className="post-wrapper">
            <span><h3> Posts ({postData.length}): </h3></span>
           

            {/* <Container>
                <Row>
                    {postData.map((post, index) => {
                        return (
                            <Col key={index} xs={12}>
                                <Card className="mx-1 my-1"> 
                                    <Card.Body>
                                        <Card.Title> {post.title} </Card.Title>
                                        <Card.Subtitle className="mb-2 mt-3 text-muted"> By {post.author} </Card.Subtitle>
                                        <Button variant="primary" onClick={() => {navigateToPost(post)}}> View Post </Button>
                                    </Card.Body>

                                    <Card.Footer className="text-muted"> Posted on {new Date(post.date).toLocaleDateString("en-US")} </Card.Footer>
                                </Card>
                            </Col>
                        )}
                    )}
                </Row>
            </Container> */}
            
        </div>
    )
}

export default Home;