import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">IntelliCycles</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#tasks">Tasks</Nav.Link>
                        <Nav.Link href="#Reminders">Reminders</Nav.Link>
                        <Nav.Link href="#Habits">Habits</Nav.Link>
                        <Nav.Link href="#Calendar">Calendar</Nav.Link>
                        <Nav.Link href="#Account">Account</Nav.Link>
                        <Nav.Link href="#Register">Register</Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;