import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const AddForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: '',
    name: '',
    description: '',
    reminder: '',
    color: '',
    repeat: '',
    due: '',
    complete: ''
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

  const getRadioClass = (type) => {
    return formData.type === type
      ? 'text-black bg-white rounded-full px-16 transition duration-150'
      : 'text-white transition duration-150';
  };

  return (
    <Container className="text-white text-center mt-4 rounded-3xl bg-zinc-950 bg-opacity-60 pt-4 h-full px-10">
      <h3 className="text-center mb-5 text-3xl border-b-2 p-3 max-w-72 mx-auto">ADD</h3>
      <Form onSubmit={handleSubmit} className="p-1 rounded-xl">
        <Form.Group as={Row} controlId="formType" className="mb-4">
          <Col sm={10} className="d-flex text-2xl justify-content-around bg-gray-950 p-2 rounded-full w-4/6 mx-auto">
            <Form.Check
              type="radio"
              label="Task"
              name="type"
              value="task"
              checked={formData.type === 'task'}
              onChange={handleChange}
              className={getRadioClass('task')}
            />
            <Form.Check
              type="radio"
              label="Reminder"
              name="type"
              value="reminder"
              checked={formData.type === 'reminder'}
              onChange={handleChange}
              className={getRadioClass('reminder')}
            />
            <Form.Check
              type="radio"
              label="Habit"
              name="type"
              value="habit"
              checked={formData.type === 'habit'}
              onChange={handleChange}
              className={getRadioClass('habit')}
            />
            <Form.Check
              type="radio"
              label="Event"
              name="type"
              value="event"
              checked={formData.type === 'event'}
              onChange={handleChange}
              className={getRadioClass('event')}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formName" className="mb-4">
          <Form.Label column sm={2} className="text-left">Name</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-black text-white placeholder-stone-400 rounded-full"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formDescription" className="mb-4">
          <Form.Label column sm={2} className="text-left">Description</Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="bg-black text-white placeholder-stone-400 rounded-[20px]"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formDueReminder" className="mb-4">
          <Form.Label column sm={2} className="text-left">Due</Form.Label>
          <Col sm={4}>
            <Form.Control
              type="datetime-local"
              placeholder="Due"
              name="due"
              value={formData.due}
              onChange={handleChange}
              required
              className="bg-black text-white placeholder-stone-400 rounded-full"
            />
          </Col>
          <Form.Label column sm={2} className="text-left">Reminder</Form.Label>
          <Col sm={4}>
            <Form.Control
              type="datetime-local"
              placeholder="Reminder"
              name="reminder"
              value={formData.reminder}
              onChange={handleChange}
              required
              className="bg-black text-white placeholder-stone-400 rounded-full"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formColorRepeat" className="mb-4">
          <Form.Label column sm={2} className="text-left">Color</Form.Label>
          <Col sm={4}>
            <Form.Control
              type="color"
              placeholder="Color"
              name="color"
              value={formData.color} 
              onChange={handleChange}
              required
              className="bg-black text-white placeholder-stone-400 w-1/6 rounded-full"
            />
          </Col>
          <Form.Label column sm={2} className="text-left">Repeat</Form.Label>
          <Col sm={4}>
            <Form.Select
              name="repeat"
              value={formData.repeat}
              onChange={handleChange}
              required
              className="bg-black text-white placeholder-stone-400 rounded-full"
            >
              <option value="">Select Repeat</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formComplete" className="mb-4">
          <Form.Label column sm={2} className="text-left">Complete</Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Complete"
              name="complete"
              value={formData.complete}
              onChange={handleChange}
              required
              className="bg-black text-white placeholder-stone-400 rounded-full"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
           <Col className="flex justify-center">
             <IoMdCheckmark
               type="submit" // Add type="submit" to make the button act as a submit button
               className="bg-teal-800 hover:bg-teal-950 transition duration-150 p-3 rounded-full mx-auto"
               color="white"
               size={80}
               onClick={handleSubmit} // Remove onClick event from here
             />
           </Col>
         </Form.Group>
      </Form>
    </Container>
  );
};

export default AddForm;
