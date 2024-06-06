import React, { useEffect, useState } from "react";
import {Schedule, IntelliWandWindow} from "../components";
import {Row, Col, Container} from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import avatar1 from '../assets/avatar.png';
import avatar2 from '../assets/avatar2.png';
import avatar3 from '../assets/avatar3.png';
import avatar4 from '../assets/avatar4.png';
import avatar5 from '../assets/avatar5.png';
import { IoMdAdd } from "react-icons/io";
import { IoIosCog } from "react-icons/io";
import { getUserIdFromToken } from "../utils/auth";
import { getToken } from "../utils/auth";


const Account = () => {
    const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5];
    const navigate= useNavigate();
    const [user, setUser] = useState({ avatar: 'avatar1', firstName: 'Jane', lastName: 'Doe', email: '', password: '' });

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
                setUser({firstName: data.body.firstName, lastName: data.body.lastName, email: data.body.email, password: data.body.password, avatar: data.body.avatar});
            } else {
                console.error('Failed to fetch user', response.status, response.statusText);
            }
        };
        fetchUser();
    }, []);


    return(
        <Row className="mx-4 h-full">
            <Col md={12}>
                <Container className="text-white text-center my-5 rounded-3xl bg-zinc-950 bg-opacity-60 p-4 px-5 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <img src={user.avatar} alt="Profile Avatar" className="m-1 w-40 h-40" />
                        <div className="flex-1 mx-4 text-white text-4xl text-center my-3">
                            <div className="border-b-2 pb-3">
                                {user.firstName} {user.lastName}
                            </div>
                        </div>
                        <IoIosCog className="hover:bg-teal-950 transition duration-150 p-2 rounded-full" color="white" size={60} onClick={() => navigate('/register')}/>
                    </div>
                </Container>
            </Col>

            <Col md={3}>
                <Container className="text-white text-center my-5 rounded-3xl bg-zinc-950 bg-opacity-60 p-3 h-6/6">
                    <h3 className="text-center mb-4 text-3xl border-b-2 pb-3 max-w-50">Friends</h3>
                    <div className="flex flex-wrap justify-center">
                        {avatars.map((avatar, index) => (
                            <img
                                key={index}
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                                className="m-2 w-24 h-24 cursor-pointer"
                            />
                        ))}
                    </div>
                    <IoMdAdd className="bg-teal-800 hover:bg-teal-950 transition duration-150 p-2 rounded-full mx-auto" color="white" size={80} onClick={() => navigate('/account')} />
                </Container>
            </Col>
            <Col md={9}>
                <Container className="text-white text-center my-5 rounded-3xl bg-zinc-950 bg-opacity-60 p-3 h-6/6 relative">
                    <h3 className="text-center mb-4 text-3xl border-b-2 pb-3 max-w-50">Personal Stats</h3>
                    <div className="absolute bottom-4 right-4">
                        {/* <IoIosCog className="hover:bg-teal-950 transition duration-150 p-2 rounded-full" color="white" size={60} onClick={() => navigate('/register')} /> */}
                    </div>
                </Container>
            </Col>
        </Row>

    )
}
export default Account;