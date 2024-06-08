import React from "react";
import {Schedule, IntelliWandWindow} from "../components";
import {Row, Col, Container} from "react-bootstrap"
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";


const Event = () => {
    const navigate = useNavigate();

    return(
        <Container className="text-white text-center mt-4 rounded-3xl bg-zinc-950 bg-opacity-60 p-4 px-5 h-full flex flex-col justify-between">
            <div className="items-center mx-auto min-w-96 h-full text-white text-4xl text-center my-3 border-b-2 max-w-[70rem] pb-3">
                Calendar
            </div>
            <Calendar />
            
            <IoMdAdd className="bg-teal-800 hover:bg-teal-950 transition duration-150 p-3 rounded-full mx-auto" color="white" size={80} onClick={() => navigate(`/add/event`)} />
            
        </Container>
    )
    
}
export default Event;
