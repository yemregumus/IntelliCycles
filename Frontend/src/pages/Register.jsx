import React, {useState} from 'react';
import { Form, Button, Row, Col, Container, OverlayTrigger, Tooltip, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';
import avatar1 from '../assets/avatar.png';
import avatar2 from '../assets/avatar2.png';
import avatar3 from '../assets/avatar3.png';
import avatar4 from '../assets/avatar4.png';
import avatar5 from '../assets/avatar5.png';
import { FaPlusCircle } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";


function Register() {
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
        // Handle form submission
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

    console.log("Rendering Register Page");
  return (
            <Row className="mx-4 h-full">
                <Col md={3}>
                    <Container className="text-white text-center my-5 rounded-3xl bg-zinc-950 bg-opacity-70 p-5">
                        
                        <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2em', fontWeight: 'bold' }}>Choose your Avatar </h3>
                        <div className="d-flex flex-wrap">
                            {avatars.map((avatar, index) => (
                                <img 
                                    key={index}
                                    src={avatar} 
                                    alt={`Avatar ${index + 1}`} 
                                    className="m-2" 
                                    style={{ width: '100px', height: '100px' }} 
                                    onClick={() => setSelectedAvatar(avatar)}
                                />
                            ))}
                        </div>
                        <FaPlusCircle className="transition duration-150 p-3 rounded-full mx-auto" color="white" size={80} />

                    </Container>
                </Col>
                <Col md={9}>
                    <Container className="text-white text-center my-5 rounded-3xl bg-zinc-950 bg-opacity-70 p-5">
                    <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2em', fontWeight: 'bold' }}>Create New Account</h3>
            <Form onSubmit={handleSubmit} style={{padding: '10px', borderRadius: '8px'}}>
                <Form.Group controlId="formAvatar" className="mb-3">
                    <Col sm={12}>
                        <div className="d-flex align-items-center justify-content-center"><img src={selectedAvatar} alt="Selected Avatar" className="m-2" style={{ width: '200px', height: '200px' }}/></div>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formEmail" className="mb-3">
                    <Form.Label column sm={2}>
                    Email ID
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: '#495057', color: '#fff', borderRadius: '25px'}}
                    />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formUsername" className="mb-3">
                    <Form.Label column sm={2}>
                    Username
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{ backgroundColor: '#495057', color: '#fff', borderRadius: '25px'}}
                    />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formDateOfBirth" className="mb-4">
                    <Form.Label column sm={2}>
                    Date of Birth
                    </Form.Label>
                    <Col sm={10}>
                    <Row>
                        <Col>
                        <Form.Control
                            as="select"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                            style={{ backgroundColor: '#495057', color: '#fff', borderRadius: '25px'}}
                        >
                            <option value="">Year</option>
                            {Array.from({ length: 100 }, (_, i) => {
                            const year = new Date().getFullYear() - i;
                            return (
                                <option key={year} value={year}>
                                {year}
                                </option>
                            );
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
                            style={{ backgroundColor: '#495057', color: '#fff', borderRadius: '25px' }}
                        >
                            <option value="">Month</option>
                            {[
                            'January', 'February', 'March', 'April', 'May', 'June',
                            'July', 'August', 'September', 'October', 'November', 'December'
                            ].map((month, index) => (
                            <option key={index + 1} value={index + 1}>
                                {month}
                            </option>
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
                            style={{ backgroundColor: '#495057', color: '#fff', borderRadius: '25px' }}
                        >
                            <option value="">Day</option>
                            {Array.from({ length: 31 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                            ))}
                        </Form.Control>
                        </Col>
                    </Row>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formMembership" className="mb-4">
                            <Form.Label column sm={2}>
                                Membership Type
                            </Form.Label>
                            <Col sm={10} className="d-flex justify-content-center align-items-center" >
                                {/* <ToggleButtonGroup
                                    type="radio"
                                    name="membership"
                                    value={formData.membership}
                                    onChange={handleChangeMembership}
                                    
                                >
                                    <ToggleButton
                                        value="basic"
                                        variant="outline-light"
                                        className={formData.membership === 'basic' ? 'active' : ''}
                                        style={formData.membership === 'basic' ? { backgroundColor: '#ffff', color: '#fff' } : { color: '#fff' }}
                                    >
                                        Basic
                                    </ToggleButton>
                                    <ToggleButton
                                        value="premium"
                                        variant="outline-light"
                                        className={formData.membership === 'premium' ? 'active' : ''}
                                        style={formData.membership === 'premium' ? { backgroundColor: '#fffff', color: '#fff' } : { color: '#fff' }}
                                    >
                                        Premium
                                    </ToggleButton>
                                </ToggleButtonGroup> */}

                                <div class="btn-group btn-group-toggle" data-toggle="formdata.membership">
                                    <label class="btn btn-secondary active">
                                        <input type="radio" name="options" id="option1" autocomplete="off" checked /> Basic
                                    </label>
                                    <label class="btn btn-secondary">
                                        <input type="radio" name="options" id="option2" autocomplete="off" /> Premium
                                    </label>
                                </div>
                                <OverlayTrigger
                                    placement="right"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltip}
                                >
                                    <InfoCircle style={{ cursor: 'pointer', marginLeft: '10px', color: '#fff' }} />
                                </OverlayTrigger>
                            </Col>
                        </Form.Group>

                <Form.Group as={Row} className="mb-2">
                    <Col className="d-flex justify-content-center">
                        <Button variant="dark" type="submit" className='w-40' style={{borderRadius: '25px'}}>
                            Sign Up
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        
    </Container>
                            
                        </Col>
            </Row>
    
    
  )
}

export default Register