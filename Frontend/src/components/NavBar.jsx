import React from "react";
import {Link} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    return (
        <Navbar expand="lg" variant="dark" className="bg-black bg-opacity-50 backdrop-blur-md">
            <Container>
                <Navbar.Brand as={Link} to="/" className="text-4xl mr-24">IntelliCycles</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                        <Nav.Link as={Link} to="/tasks">Tasks</Nav.Link>
                        <Nav.Link as={Link} to="/reminders">Reminders</Nav.Link>
                        <Nav.Link as={Link} to="/habits">Habits</Nav.Link>
                        <Nav.Link as={Link} to="/calendar">Calendar</Nav.Link>
                        <Nav.Link as={Link} to="/account">Account</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;