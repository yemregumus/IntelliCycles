import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import {EditEventForm, EditHabitForm, EditReminderForm, EditTaskForm} from "../EditForms"
import { MdDelete} from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { deleteActivityById, updateActivityById } from "../../../api";
//import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const EditDialog = ({show, type, handleClose, entity, updateTasks}) =>{
    //const navigate= useNavigate();

    const [formData, setFormData] = useState(entity);

    useEffect(() => {
        if (type) {
          setFormData((prevData) => ({
            ...prevData,
            type: type,
          }));
        }
        if (entity) {
            setFormData(entity);
        }
    }, [type, entity]);
    
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

    const handleDelete= async () =>{
        if (window.confirm(`Are you sure you want to delete your ${entity.type}: ${entity.name}?`)) {
            await deleteActivityById(entity.id);
            handleClose();
            updateTasks();
            toast.success(`${entity.name} ${entity.type} has been successfully deleted.`)
        }
        
    }

    const handleSubmit= async () =>{
        if(formData.dueDateTime==""){
            formData.dueDateTime=null;
        }
        if(formData.reminderDateTime==""){
            formData.reminderDateTime=null;
        }
        if(formData.startDateTime==""){
            formData.startDateTime=null;
        }
        if(formData.endDateTime==""){
            formData.endDateTime=null;
        }
        await updateActivityById(formData);
        handleClose();
        updateTasks();        
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
                            <Button type="submit" onClick={handleSubmit} className="bg-teal-800 hover:bg-teal-950 transition duration-150 p-2 rounded-full">
                                <FaRegSave color="white" size={40}  />
                            </Button>
                        </Modal.Footer>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

EditDialog.propTypes = {
    show: PropTypes.bool,
    type: PropTypes.string,
    handleClose: PropTypes.func,
    entity: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        type: PropTypes.string,
        dueDateTime: PropTypes.string,
        reminderDateTime: PropTypes.string,
        startDateTime: PropTypes.string,
        endDateTime: PropTypes.string,
        streak: PropTypes.number,
      }),
    updateTasks: PropTypes.func,
};

export default EditDialog;