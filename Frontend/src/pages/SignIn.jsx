import React, {useState} from "react";
import { Form, Button, Row, Col, Container} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast';


const SignIn = () => {
    const apiUrl = import.meta.env.VITE_BACKEND_DOMAIN;
    const navigate= useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = formData;
        try {
            const response = await fetch(`${apiUrl}/api/auth/validate-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('jwt', data.body);
                toast.success('Login successful, Welcome');
                navigate('/home');
            } else {
                // Handle error

                console.error('Failed to login', response.status, response.statusText);
                setFormData({ ...formData, password: '' });
                toast.error('Username or password is incorrect. Please try again.');
            }
        } catch (error) {
            console.error('Failed to login', error);
            setFormData({ ...formData, password: '' });
            toast.error(error.message);

        }
    };

    return (
        <Container className="text-white text-center my-5 max-w-[40rem] rounded-3xl bg-zinc-950 bg-opacity-60 p-3 h-6/6">
            <h3 className="text-center mb-2 text-3xl border-b-2 pb-3 max-w-96 mx-auto">Sign In</h3>
            <Form onSubmit={handleSubmit} className="p-4 rounded-xl">
                <Form.Group as={Row} controlId="formUsername" className="mb-4 justify-content-center">
                    <Form.Label column sm={2} className="text-left">Username</Form.Label>
                    <Col sm={10} md={8} lg={6}>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            required
                            className="bg-black text-white placeholder-stone-400 rounded-full max-w-52 mx-auto"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formPassword" className="mb-4 justify-content-center">
                    <Form.Label column sm={2} className="text-left">Password</Form.Label>
                    <Col sm={10} md={8} lg={6}>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            className="bg-black text-white placeholder-stone-400 rounded-full max-w-52 mx-auto"
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-4">
                    <Col className="flex justify-center">
                        <Button type="submit" className="bg-teal-800 hover:bg-teal-950 border-2 border-teal-950 transition duration-150 text-2xl rounded-full mx-auto px-4">Sign In</Button>
                    </Col>
                </Form.Group>
                <div className='text-blue-200 hover:text-blue-400 transition duration-150 cursor-pointer' onClick={() => navigate('/register')}>Don&apos;t have an account?</div>
                {/* <div className='text-blue-200 hover:text-blue-400 transition duration-150 cursor-pointer' onClick={() => navigate('/')}>Forgot password or username ?</div> */}
            </Form>
        </Container>
    );
}

export default SignIn;