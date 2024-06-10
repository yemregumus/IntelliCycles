import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import {EditEventForm, EditHabitForm, EditReminderForm, EditTaskForm} from "../EditForms"

const EditDialog = ({show, type, handleClose}) =>{
    const [formData, setFormData] = useState({
        type: type || "task",
        name: "",
        description: "",
        color: "",
        reminder: "",
        repeat: "",
        due: "",
        streak: "",
        startTime: "",
        endTime: "",
        complete: false,
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
        setFormData({
          ...formData,
          [name]: inputType === "checkbox" ? checked : value,
        });
    };

    const renderFormSection = () => {
        switch (type) {
          case "reminder":
            return <EditReminderForm formData={formData} handleChange={handleChange} />;
          case "habit":
            return <EditHabitForm formData={formData} handleChange={handleChange} />;
          case "event":
            return <EditEventForm formData={formData} handleChange={handleChange} />;
          default:
            return <EditTaskForm formData={formData} handleChange={handleChange} />;
        }
    };
    return (
        <div>
            <Modal show={show} onHide={handleClose} size="lg" centered className="rounded-3xl">
                <div className="fixed text-white inset-0 flex items-center justify-center z-50">
                    <div className="bg-gradient-to-r from-[#9e184ddb] to-[#0015b366] backdrop-blur-md border-3 border-rose-950 p-3 w-full h-auto max-w-3xl mx-auto rounded-3xl">
                        <Modal.Header closeVariant='white' closeButton className="text-white">
                            <Modal.Title>EDIT {type.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='p-4'>
                            {renderFormSection(type)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>
                                Cancel
                            </Button>
                            {/* <Button variant="success" onClick={handlePasswordChange}>
                                Change Password
                            </Button> */}
                        </Modal.Footer>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default EditDialog;