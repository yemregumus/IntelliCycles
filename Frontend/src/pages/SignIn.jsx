import React, {useState} from "react";
import { Form, Button, Row, Col, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';


const SignIn = () => {
    const navigate= useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const response = await fetch('https://localhost:8080/validate-user', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(formData),
    //     });
    
    //     if (response.ok) {
    //         const data = await response.json();
    //         sessionStorage.setItem('jwt', data.token);
    //     } else {
    //         // Handle error
    //         console.error('Failed to login');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;
        try {
            const response = await fetch('http://localhost:8080/api/auth/validate-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('jwt', data.token);
                toast.success('Login successful, Welcome');
                navigate('/home');
            } else {
                // Handle error
                console.error('Failed to login');
                toast.error(response.error);
            }
        } catch (error) {
            console.error('Failed to login', error);
            toast.error(error.message);
        }
    };

    return(
        <Container className="text-white text-center my-5 rounded-3xl bg-zinc-950 bg-opacity-60 p-3 h-6/6">
            <h3 className="text-center mb-2 text-3xl border-b-2 pb-3 max-w-96 mx-auto">Login</h3>
            <Form onSubmit={handleSubmit} className="p-4 rounded-xl">
                <Form.Group as={Row} controlId="formUsername" className="mb-4">
                    <Form.Label column sm={2} className="text-left">Username</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            className="bg-black text-white placeholder-stone-400 rounded-full"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPassword" className="mb-4">
                    <Form.Label column sm={2} className="text-left">Password</Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="password"
                            placeholder=" Enter password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="bg-black text-white placeholder-stone-400 rounded-full"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                    <Col className="flex justify-center">
                        <Button type="submit" className="bg-teal-800 hover:bg-teal-950 border-2 border-teal-950 transition duration-150 text-2xl rounded-full mx-auto px-4">Sign In</Button>
                    </Col>
                </Form.Group>
                <div className='text-blue-200 hover:text-blue-400 transition duration-150 cursor-pointer' onClick={() => navigate('/register')}>Don't have an account?</div>
                <div className='text-blue-200 hover:text-blue-400 transition duration-150 cursor-pointer' onClick={() => navigate('/')}>Forgot password or username ?</div>
            </Form>
        
        </Container>
    )
}

export default SignIn