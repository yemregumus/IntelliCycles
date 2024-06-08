import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';
import avatar1 from '../assets/avatar.png';
import avatar2 from '../assets/avatar2.png';
import avatar3 from '../assets/avatar3.png';
import avatar4 from '../assets/avatar4.png';
import avatar5 from '../assets/avatar5.png';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromToken, getToken } from '../utils/auth';
import {toast} from 'react-hot-toast';

function ProfileSettings() {
    const apiUrl = import.meta.env.VITE_BACKEND_DOMAIN;
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState(avatar5);
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [user, setUser] = useState({ avatar: '', firstName: '', lastName: '', username:'', email: '', password: '', dateOfBirth: '', membership: ''});

    useEffect(() => {
        const fetchUser = async () => {
            const userId = getUserIdFromToken();
            console.log(`USER ID: ${userId}`);
            const response = await fetch(`${import.meta.env.VITE_BACKEND_DOMAIN}/api/user/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log('User data:', data);
                setUser({firstName: data.body.firstName, lastName: data.body.lastName, username: data.body.username, email: data.body.email, password: data.body.password, avatar: data.body.avatar});
            } else {
                console.error('Failed to fetch user', response.status, response.statusText);
            }
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { avatar, firstName, lastName, email, username, password, year, month, day, membership } = user;
        const dateOfBirth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        if(password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/api/user/:userId`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ avatar: selectedAvatar, firstName, lastName, email}),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Profile update successful');
                navigate('/home');
            } else {
                // Handle error
                console.error('Failed to update profile', response.status, response.statusText);
                toast.error(response.error);
            }
        } catch (error) {
            console.error('Failed to update ', error);
            toast.error(error.message);
        }
    };

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <strong>Basic:</strong> Access to basic features.<br />
            <strong>Premium:</strong> Access to all features.
        </Tooltip>
    );

    
    return (
        <Row className="mx-4 h-full">
            <Col md={3}>
                <Container className="text-white text-center my-3 rounded-3xl bg-zinc-950 bg-opacity-60 p-3 h-6/6">
                    <h3 className="text-center mb-4 text-3xl border-b-2 pb-3 max-w-50">Change your Avatar</h3>
                    <div className="flex flex-wrap justify-center">
                        {avatars.map((avatar, index) => (
                            <img
                                key={index}
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                                className="m-2 w-24 h-24 cursor-pointer"
                                onClick={() => {setSelectedAvatar(avatar); setUser({ ...user, avatar }); setIsFormChanged(true);}}
                            />
                        ))}
                    </div>
                </Container>
            </Col>
            <Col md={9}>
                <Container className="text-white text-center my-3 rounded-3xl bg-zinc-950 bg-opacity-60 p-3 h-6/6">
                    <h3 className="text-center mb-1 text-3xl border-b-2 pb-3 max-w-96 mx-auto">Profile Settings</h3>
                    <Form onSubmit={handleSubmit} className="p-4 rounded-xl">
                        <Form.Group controlId="formAvatar" className="mb-3">
                            <Col sm={12}>
                                <div className="flex justify-center">
                                    <img src={user.avatar} alt="Selected Avatar" className="mb-1 w-36 h-36" />
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
                                    value={user.firstName}
                                    onChange={(e) => {setUser({ ...user, firstName: e.target.value });setIsFormChanged(true);}}
                                    className="bg-black text-white placeholder-stone-400 rounded-full"
                                />
                            </Col>
                            <Form.Label column sm={2} className="text-left">Last Name</Form.Label>
                            <Col sm={4}>
                                <Form.Control
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    value={user.lastName}
                                onChange={(e) => {setUser({ ...user, lastName: e.target.value }); setIsFormChanged(true);}}
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
                                    value={user.email}
                                    onChange={(e) => {setUser({ ...user, email: e.target.value }); setIsFormChanged(true);}}
                                    className="bg-black text-white placeholder-stone-400 rounded-full"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formUsername" className="mb-4">
                            <Form.Label column sm={2} className="text-left">Username</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={user.username}
                                    className="bg-black text-white placeholder-stone-400 rounded-full"
                                    disabled={true}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPassword" className="mb-4">
                            <Form.Label column sm={2} className="text-left">Password</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    value={user.password}
                                    onChange={(e) => {setUser({ ...user, password: e.target.value }); setIsFormChanged(true);}}
                                    className="bg-black text-white placeholder-stone-400 rounded-full"
                                />
                            </Col>
                        </Form.Group>
                        {/* <Form.Group as={Row} controlId="formConfirmPassword" className="mb-4">
                            <Form.Label column sm={2} className="text-left">Confirm Password</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="bg-black text-white placeholder-stone-400 rounded-full"
                                />
                            </Col>
                        </Form.Group> */}
                        <Form.Group as={Row} controlId="formDateOfBirth" className="mb-4">
                            <Form.Label column sm={2} className="text-left">Date of Birth</Form.Label>
                            <Col sm={10}>
                                <Row>
                                    <Col>
                                        <Form.Control
                                            as="select"
                                            name="year"
                                            value={user.year}
                                            onChange={(e) => setUser({ ...user, year: e.target.value })}

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
                                            value={user.month}
                                            onChange={(e) => setUser({ ...user, month: e.target.value })}
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
                                            value={user.day}
                                            onChange={(e) => setUser({ ...user, day: e.target.value })}
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
                                        <input type="radio" name="membership" id="basic" autoComplete="on" checked={user.membership === 'basic'} onChange={() => {setUser({ ...user, membership: 'basic' }); setIsFormChanged(true);}} /> Basic
                                    </label>
                                    <label className="btn btn-secondary bg-black">
                                        <input type="radio" name="membership" id="premium" autoComplete="off" checked={user.membership === 'premium'} onChange={() => {setUser({ ...user, membership: 'premium' }); setIsFormChanged(true);}} /> Premium
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
                                <Button type="submit" disabled={!isFormChanged} className={`${isFormChanged ? "bg-teal-800 border-teal-950 hover:bg-teal-950" : "bg-black border-black"} border-2 transition duration-150 text-2xl rounded-full mx-auto px-4`}>Update Profile</Button>
                                <Button type="button" className="bg-red-800 hover:bg-red-950 border-2 border-teal-950 transition duration-150 text-2xl rounded-full mx-auto px-4">Change Password</Button>
                                <Button type="button" onClick={() => navigate('/account')} className="bg-slate-400 hover:bg-slate-800 border-2 border-teal-950 transition duration-150 text-2xl rounded-full mx-auto px-4">Cancel</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                    
                </Container>
            </Col>
        </Row>
    );
}

export default ProfileSettings