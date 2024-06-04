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
            <div className="flex-grow"></div>
            <GiFairyWand className="bg-teal-800 hover:bg-teal-950 transition duration-150 p-3 rounded-full mx-auto" color="white" size={80} onClick={() => navigate('/intelliwand')}/>
        </Container>
    );
}

export default IntelliWandWindow;