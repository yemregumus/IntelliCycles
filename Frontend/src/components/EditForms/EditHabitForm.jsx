import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { FaFire } from "react-icons/fa6";
import PropTypes from "prop-types";

const EditHabitForm = ({ formData, handleChange }) => (
  <div>
    <Form.Group as={Row} controlId="formHabitName" className="mb-4">
      <Form.Label column sm={2} className="text-left">Name</Form.Label>
      <Col sm={10} >
      <Form.Control
        type="text"
        placeholder="Habit Name"
        name="name"
        value={formData.name || ""}
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
              type="dueDateTime"
              name="due"
              value={formData.dueDateTime ? formData.dueDateTime.substring(0, 16) : ""}
              onChange={handleChange}
              required
              className="bg-stone-400 text-black placeholder-stone-950 rounded-full"
            />
        </Col>
        <Form.Label column sm={2} className="text-left">Reminder</Form.Label>
        <Col sm={4}>
            <Form.Control
                type="datetime-local"
                name="reminderDateTime"
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
          name="repeatInterval"
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
      <Col sm={4}>
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
      <Form.Label column sm={2} className="text-left items-center"><FaFire size="30" color="orange"/></Form.Label>
      <Col sm={4}>
        <div className="text-3xl">{formData.streak}</div>
      </Col>
    </Form.Group>
  </div>
);

EditHabitForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    dueDateTime: PropTypes.string,
    reminderDateTime: PropTypes.string,
    color: PropTypes.string,
    repeatInterval: PropTypes.string,
    complete: PropTypes.bool,
    streak: PropTypes.number,
  }),
  handleChange: PropTypes.func,
};

export default EditHabitForm;
