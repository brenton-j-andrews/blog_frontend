import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavigationBar = () => {
    return (
        <Navbar expand="lg" bg="light" className="container-fluid my-5 py-3 border-top border-bottom">
            <Container>
                <Navbar.Brand href="/"> My Blog </Navbar.Brand>
            
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/post/create_post"> Create New Post </Nav.Link>
                        <Nav.Link href="#link"> View All Posts </Nav.Link>
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        <Nav.Link href="/post/create_post"> Sign In </Nav.Link>
                        <Nav.Link href="#link"> Create Account </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  );
}

export default NavigationBar;