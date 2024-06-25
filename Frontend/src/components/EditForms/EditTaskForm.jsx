import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const EditTaskForm = ({ formData, handleChange }) => {
  return (
    <div>
      <Form.Group as={Row} controlId="formTaskName" className="mb-4">
        <Form.Label column sm={2} className="text-left">Name</Form.Label>
        <Col sm={10} >
          <Form.Control
            type="text"
            placeholder="Task Name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
            className="bg-stone-400 text-black placeholder-stone-950 rounded-full"
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formTaskDescription" className="mb-4">
        <Form.Label column sm={2} className="text-left">Description</Form.Label>
        <Col sm={10}>
          <Form.Control
            as="textarea"
            placeholder="Task Description"
            name="description"
            value={formData.description || ""}
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
            name="due_date"
            value={formData.dueDateTime ? formData.DueDateTime.substring(0, 16) : ""}
            onChange={handleChange}
            required
            className="bg-stone-400 text-black placeholder-stone-950 rounded-full"
          />
        </Col>
        <Form.Label column sm={2} className="text-left">Reminder</Form.Label>
        <Col sm={4}>
          <Form.Control
            type="datetime-local"
            name="reminder_datetime"
            value={formData.reminderDateTime ? formData.reminderDateTime.substring(0, 16) : ""}
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
            value={formData.color || ""}
            onChange={handleChange}
            required
            className="bg-stone-400 placeholder-stone-950 rounded-full"
          />
        </Col>
        <Form.Label column sm={2} className="text-left">Repeat</Form.Label>
        <Col sm={4}>
          <Form.Select
            name="repeat_interval"
            value={formData.repeatInterval || ""}
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
            checked={formData.complete || false}
            onChange={handleChange}
            className=""
          />
        </Col>
      </Form.Group>
    </div>
  );
};

export default EditTaskForm;
