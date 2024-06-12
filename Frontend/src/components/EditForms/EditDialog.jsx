import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import {EditEventForm, EditHabitForm, EditReminderForm, EditTaskForm} from "../EditForms"
import { MdDelete, MdCancel } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { deleteTaskById } from "../../../api";
import { useNavigate } from "react-router-dom";

const EditDialog = ({show, type, handleClose, entity, updateTasks}) =>{
    const navigate= useNavigate();

    const [formData, setFormData] = useState(entity);

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

    const handleDelete= async (e) =>{
        if (window.confirm(`Are you sure you want to delete your ${entity.type}: ${entity.name}?`)) {
            await deleteTaskById(entity.id);
            handleClose();
            updateTasks();
        }
        
    }

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
                    <div className="bg-gradient-to-r from-[#540056bf] to-[#000c4b4d] border-1 border-black backdrop-blur-md p-3 w-full h-auto max-w-3xl mx-auto rounded-3xl">
                        <Modal.Header closeVariant='white' closeButton className="text-white">
                            <Modal.Title>EDIT {type.toUpperCase()}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className='p-4'>
                            {renderFormSection(type)}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={handleDelete} className="bg-red-800 hover:bg-red-950 transition duration-150 p-2 rounded-full">
                                <MdDelete color="white" size={40}  />
                            </Button>
                            <Button variant="submit" onClick={handleClose} className="bg-teal-800 hover:bg-teal-950 transition duration-150 p-2 rounded-full">
                                <FaRegSave color="white" size={40}  />
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