import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { AddTaskForm, AddHabitForm, AddReminderForm, AddEventForm } from "../AddForms";
import { IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { createActivity } from "../../../api/activity";
import { getUserIdFromToken } from "../../utils/auth";

const AddForm = ({ type }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: type || "task",
    name: "",
    description: "",
    due: "",
    reminder: "",
    color: "#000000",
    repeat: "",
    complete: false,
    startTime: "",
    endTime: "",
    streak: 0,
  });

  useEffect(() => {
    if (type) {
      setFormData((prevData) => ({
        ...prevData,
        type: type,
      }));
    }
  }, [type]);

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    if (name === "name" && value.length > 12) {
      return; 
    }
    setFormData({
      ...formData,
      [name]: inputType === "checkbox" ? checked : value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const activityData = {
      // userid: getUserIdFromToken(),
      // type: formData.type,
      name: formData.name,
      description: formData.description,
      dueDateTime: formData.due,
      reminderDateTime: formData.reminder || null,
      color: formData.color,
      repeatInterval: formData.repeat,
      complete: formData.complete,
      startDateTime: formData.startTime,
      endDateTime: formData.endTime,
      streak: formData.streak,
    };
    try {
      console.log(activityData);
      const createdActivity = await createActivity(activityData, getUserIdFromToken(), formData.type);
      // console.log("Task created with ID: ", createdActivity.activityId);
      navigate("/home"); // Navigate to the tasks page or any other page
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  const getRadioClass = (radioType) => {
    return formData.type === radioType ? "text-black bg-white rounded-full px-16 transition duration-150" : "text-white transition duration-150";
  };

  const renderFormSection = () => {
    switch (formData.type) {
      case "reminder":
        return <AddReminderForm formData={formData} handleChange={handleChange} />;
      case "habit":
        return <AddHabitForm formData={formData} handleChange={handleChange} />;
      case "event":
        return <AddEventForm formData={formData} handleChange={handleChange} />;
      default:
        return <AddTaskForm formData={formData} handleChange={handleChange} />;
    }
  };

  return (
    <Container className="text-white text-center mt-4 rounded-3xl bg-zinc-950 bg-opacity-60 pt-4 h-full px-10">
      <h3 className="text-center mb-5 text-3xl border-b-2 p-3 max-w-72 mx-auto">ADD</h3>
      <Form onSubmit={handleSubmit} className="p-1 rounded-xl">
        <Form.Group as={Row} controlId="formType" className="mb-4">
          <Col sm={10} className="d-flex text-2xl justify-content-around bg-gray-950 p-2 rounded-full w-4/6 mx-auto">
            <Form.Check type="radio" label="Task" name="type" value="task" checked={formData.type === "task"} onChange={handleChange} className={getRadioClass("task")} />
            <Form.Check type="radio" label="Reminder" name="type" value="reminder" checked={formData.type === "reminder"} onChange={handleChange} className={getRadioClass("reminder")} />
            <Form.Check type="radio" label="Habit" name="type" value="habit" checked={formData.type === "habit"} onChange={handleChange} className={getRadioClass("habit")} />
            <Form.Check type="radio" label="Event" name="type" value="event" checked={formData.type === "event"} onChange={handleChange} className={getRadioClass("event")} />
          </Col>
        </Form.Group>
        {renderFormSection()}
        <Form.Group as={Row}>
          <Col className="flex justify-center">
            <Button type="submit" onSubmit={handleSubmit} className="bg-teal-800 hover:bg-teal-950 transition duration-150 p-1 rounded-full mx-auto">
              <IoMdCheckmark color="white" size={70} />
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddForm;
