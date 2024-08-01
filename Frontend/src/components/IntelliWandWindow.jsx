import React from "react";
import { Container } from "react-bootstrap";
import { GiFairyWand } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const IntelliWandWindow = () => {
    const navigate = useNavigate();
    return (
        <Container className="text-white text-center mt-4 rounded-3xl bg-zinc-950 bg-opacity-60 p-4 h-full flex flex-col justify-between">
            <div className="border-b-2 text-3xl py-3">
                IntelliWand
            </div>
            <div className="flex-grow text-left text-xl mt-5">
                If you need any help regarding quesions like:
                <br />
                <br />
                <ul className="list-disc ml-3">
                    <li> How to create a Task</li>
                    <li> How to create a Reminder</li>
                    <li> How to create a Habit</li>
                    <li> How to create a Event</li>
                </ul>
                <br />
                Click the IntelliWand Button Below
            </div>
            <GiFairyWand className="bg-teal-800 hover:bg-teal-950 transition duration-150 p-3 rounded-full mx-auto" color="white" size={80} onClick={() => navigate('/intelliwand')}/>
        </Container>
    );
}

export default IntelliWandWindow;