import React, { useState } from 'react';
import { Form, Button, Row, Col, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';
import avatar1 from '../assets/avatar.png';
import avatar2 from '../assets/avatar2.png';
import avatar3 from '../assets/avatar3.png';
import avatar4 from '../assets/avatar4.png';
import avatar5 from '../assets/avatar5.png';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";

function Register() {
    const navigate= useNavigate()
    const [formData, setFormData] = useState({
        avatar: '',
        email: '',
        username: '',
        year: '',
        month: '',
        day: '',
        membership: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <strong>Basic:</strong> Access to basic features.<br />
            <strong>Premium:</strong> Access to all features.
        </Tooltip>
    );

    const [selectedAvatar, setSelectedAvatar] = useState(avatar5);
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];

    return (
        <Row className="mx-4 h-full">
            <Col md={3}>
                <Container className="text-white text-center my-5 rounded-3xl bg-gray-900 bg-opacity-70 p-3 h-6/6">
                    <h3 className="text-center mb-4 text-3xl border-b-2 pb-3 max-w-50">Choose your Avatar</h3>
                    <div className="flex flex-wrap justify-center">
                        {avatars.map((avatar, index) => (
                            <img
                                key={index}
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                                className="m-2 w-24 h-24 cursor-pointer"
                                onClick={() => setSelectedAvatar(avatar)}
                            />
                        ))}
                    </div>
                </Container>
            </Col>
            <Col md={9}>
                <Container className="text-white text-center my-5 rounded-3xl bg-gray-900 bg-opacity-70 p-3 h-6/6">
                    <h3 className="text-center mb-2 text-3xl border-b-2 pb-3 max-w-96 mx-auto">Create New Account</h3>
                    <Form onSubmit={handleSubmit} className="p-4 rounded-xl">
                        <Form.Group controlId="formAvatar" className="mb-3">
                            <Col sm={12}>
                                <div className="flex justify-center">
                                    <img src={selectedAvatar} alt="Selected Avatar" className="m-2 w-48 h-48" />
                                </div>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formName" className="mb-4">
                            <Form.Label column sm={2} className="text-left">First Name</Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="bg-black text-white placeholder-stone-400 rounded-full"
                                />
                            </Col>
                            <Form.Label column sm={2} className="text-left">Last Name</Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="bg-black text-white placeholder-stone-400 rounded-full"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formEmail" className="mb-4">
                            <Form.Label column sm={2} className="text-left">Email ID</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="email"
                                    placeholder="john.doe@gmail.com"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="bg-black text-white placeholder-stone-400 rounded-full"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formUsername" className="mb-4">
                            <Form.Label column sm={2} className="text-left">Username</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="bg-black text-white placeholder-stone-400 rounded-full"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formDateOfBirth" className="mb-4">
                            <Form.Label column sm={2} className="text-left">Date of Birth</Form.Label>
                            <Col sm={10}>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            as="select"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleChange}
                                            required
                                            className="bg-black text-white placeholder-stone-400 rounded-full"
                                        >
                                            <option value="">Year</option>
                                            {Array.from({ length: 100 }, (_, i) => {
                                                const year = new Date().getFullYear() - i;
                                                return <option key={year} value={year}>{year}</option>;
                                            })}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            as="select"
                                            name="month"
                                            value={formData.month}
                                            onChange={handleChange}
                                            required
                                            className="bg-black text-white placeholder-stone-400 rounded-full"
                                        >
                                            <option value="">Month</option>
                                            {[
                                                'January', 'February', 'March', 'April', 'May', 'June',
                                                'July', 'August', 'September', 'October', 'November', 'December'
                                            ].map((month, index) => (
                                                <option key={index + 1} value={index + 1}>{month}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            as="select"
                                            name="day"
                                            value={formData.day}
                                            onChange={handleChange}
                                            required
                                            className="bg-black text-white placeholder-stone-400 rounded-full"
                                        >
                                            <option value="">Day</option>
                                            {Array.from({ length: 31 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formMembership" className="mb-4">
                            <Form.Label column sm={2} className="text-left">Membership Type</Form.Label>
                            <Col sm={10} className="flex items-center justify-left">
                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label className="btn btn-secondary bg-black">
                                        <input type="radio" name="membership" id="basic" autoComplete="on" checked={formData.membership === 'basic'} onChange={() => setFormData({ ...formData, membership: 'basic' })} /> Basic
                                    </label>
                                    <label className="btn btn-secondary bg-black">
                                        <input type="radio" name="membership" id="premium" autoComplete="off" checked={formData.membership === 'premium'} onChange={() => setFormData({ ...formData, membership: 'premium' })} /> Premium
                                    </label>
                                </div>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <InfoCircle className="cursor-pointer ml-3 text-white" />
                                </OverlayTrigger>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-4">
                            <Col className="flex justify-center">
                                <Button type="submit" className="bg-teal-800 hover:bg-teal-950 border-2 border-teal-950 transition duration-150 text-2xl rounded-full mx-auto px-4">Sign Up</Button>
                            </Col>
                        </Form.Group>
                        <div className='text-blue-200 hover:text-blue-400 transition duration-150 cursor-pointer' onClick={() => navigate('/signin')}>Already have an account?</div>
                    </Form>
                    
                </Container>
            </Col>
        </Row>
    );
}

export default Register;
