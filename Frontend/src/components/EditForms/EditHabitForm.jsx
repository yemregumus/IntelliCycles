import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const EditHabitForm = ({ formData, handleChange }) => (
  <div>
    <Form.Group as={Row} controlId="formHabitName" className="mb-4">
      <Form.Label column sm={2} className="text-left">Name</Form.Label>
      <Col sm={10} >
      <Form.Control
        type="text"
        placeholder="Habit Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="bg-stone-400 text-black placeholder-stone-950 rounded-full"
      />
      </Col>
    </Form.Group>
    <Form.Group as={Row} controlId="formHabitDescription" className="mb-4">
        <Form.Label column sm={2} className="text-left">Description</Form.Label>
        <Col sm={10}>
            <Form.Control
                as="textarea"
                placeholder="Habit Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="bg-stone-400 text-black placeholder-stone-950 rounded-[20px]"
            />
        </Col>
    </Form.Group>
    <Form.Group as={Row} controlId="formDueReminder" className="mb-4">
        <Form.Label column sm={2} className="text-left">Due</Form.Label>
        <Col sm={4}>
            <Form.Control
              type="datetime-local"
              name="due"
              value={formData.dueDateTime}
              onChange={handleChange}
              required
              className="bg-stone-400 text-black placeholder-stone-950 rounded-full"
            />
        </Col>
        <Form.Label column sm={2} className="text-left">Reminder</Form.Label>
        <Col sm={4}>
            <Form.Control
                type="datetime-local"
                name="reminder"
                value={formData.reminderDateTime}
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
        required
        className="bg-stone-400 placeholder-stone-950 rounded-full"
      />
      </Col>
      <Form.Label column sm={2} className="text-left">Repeat</Form.Label>
      <Col sm={4}>
        <Form.Select
          name="repeat"
          value={formData.repeatInterval}
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
    <Form.Group as={Row} controlId="formTaskComplete" className="mb-4 items-center">
      <Form.Label column sm={2} className="text-left">Complete</Form.Label>
      <Col sm={10}>
      <Form.Check
        type="switch"
        id="completeSwitch"
        label=""
        name="complete"
        checked={formData.complete}
        onChange={handleChange}
        className=""
      />
      </Col>
    </Form.Group>
  </div>
);

export default EditHabitForm;
