import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const EditReminderForm = ({ formData, handleChange }) => (
  <div>
    <Form.Group as={Row} controlId="formReminderName" className="mb-4">
      <Form.Label column sm={2} className="text-left">Name</Form.Label>
      <Col sm={10} >
      <Form.Control
        type="text"
        placeholder="Reminder Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="bg-stone-400 text-black placeholder-stone-950 rounded-full"
      />
      </Col>
    </Form.Group>
    <Form.Group as={Row} controlId="formReminderRepeat" className="mb-4">
        <Form.Label column sm={2} className="text-left">Reminder</Form.Label>
        <Col sm={4}>
            <Form.Control
              type="datetime-local"
              name="reminder"
              value={formData.reminder}
              onChange={handleChange}
              required
              className="bg-stone-400 text-black placeholder-stone-950 rounded-full"
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

    <Form.Group as={Row} controlId="formColor" className="mb-4">
      <Form.Label column sm={2} className="text-left">Color</Form.Label>
      <Col sm={4}>
      <Form.Control
        type="color"
        name="color"
        value={formData.color}
        onChange={handleChange}
        required
        className="bg-stone-400 placeholder-stone-950 rounded-full"
      />
      </Col>
    </Form.Group>
  </div>
);

export default EditReminderForm;