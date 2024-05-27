import React from 'react';
import { Form, Button, Row, Col, Container, OverlayTrigger, Tooltip, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';
import { useState } from 'react';


function Register() {
    const [formData, setFormData] = useState({
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

      const [membership, setMembership] = useState('premium'); // default to 'basic'

        const handleChangeMembership = (val) => {
            setMembership(val);
            setFormData({ ...formData, membership: val });
            console.log(val);
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

    console.log("Rendering Register Page");
  return (
    <Container className="text-white text-center my-5 rounded-3xl bg-zinc-950 bg-opacity-70 p-5">
        <h3 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2em', fontWeight: 'bold' }}>Create New Account</h3>
       <Form onSubmit={handleSubmit} style={{padding: '10px', borderRadius: '8px'}}>
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

                        <div class="btn-group btn-group-toggle" data-toggle="buttons">
                            <label class="btn btn-secondary active">
                                <input type="radio" name="options" id="option1" autocomplete="off" checked /> Active
                            </label>
                            <label class="btn btn-secondary">
                                <input type="radio" name="options" id="option2" autocomplete="off" /> Radio
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
  )
}

export default Register