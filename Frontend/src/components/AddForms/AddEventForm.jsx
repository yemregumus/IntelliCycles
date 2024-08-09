import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const AddEventForm = ({ formData, handleChange }) => (
  <div>
    <Form.Group as={Row} controlId="formEventName" className="mb-4">
      <Form.Label column sm={2} className="text-left">Name</Form.Label>
      <Col sm={10} >
      <Form.Control
        type="text"
        placeholder="Event Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="bg-stone-400 text-black placeholder-stone-950 rounded-full"
      />
      </Col>
    </Form.Group>
    <Form.Group as={Row} controlId="formEventDescription" className="mb-4">
        <Form.Label column sm={2} className="text-left">Description</Form.Label>
        <Col sm={10}>
            <Form.Control
                as="textarea"
                placeholder="Event Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="bg-stone-400 text-black placeholder-stone-950 rounded-[20px]"
            />
        </Col>
    </Form.Group>
    <Form.Group as={Row} controlId="startEndTime" className="mb-4">
        <Form.Label column sm={2} className="text-left">Start Time</Form.Label>
        <Col sm={4}>
            <Form.Control
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
              className="bg-stone-400 text-black placeholder-stone-950 rounded-full"
            />
        </Col>
        <Form.Label column sm={2} className="text-left">End Time</Form.Label>
        <Col sm={4}>
            <Form.Control
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="bg-stone-400 text-black placeholder-stone-950 rounded-full"
            />
        </Col>
    </Form.Group>
    <Form.Group as={Row} controlId="formColorRepeat" className="mb-4">
      <Form.Label column sm={2} className="text-left">Color</Form.Label>
      <Col sm={4}>
      <Form.Control
        type="color"
        name="color"
        value={formData.color}
        onChange={handleChange}
        className="bg-stone-400 placeholder-stone-950 rounded-full"
      />
      </Col>
      <Form.Label column sm={2} className="text-left">Repeat</Form.Label>
      <Col sm={4}>
        <Form.Select
          name="repeat"
          value={formData.repeat}
          onChange={handleChange}
          className="bg-stone-400 placeholder-stone-950 rounded-full"
        >
          <option value="">Select Repeat</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </Form.Select>
      </Col>
    </Form.Group>
  </div>
);

AddEventForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    color: PropTypes.string,
    repeat: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AddEventForm;
