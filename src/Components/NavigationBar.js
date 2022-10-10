import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavigationBar = () => {
    return (
        <Navbar bg="light" expand="lg" className="navbar navbar-expand-lg">

            <Container>
                <Navbar.Brand href="/"> My Blog </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    <Navbar.Collapse id="basic-navbar-nav" className="navbar-right">
                        <Nav className="me-auto">
                            <Nav.Link href="/post/create_post"> Create New Post </Nav.Link>
                            <Nav.Link href="#link"> View All Posts </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                
            </Container>

        </Navbar>
  );
}

export default NavigationBar;