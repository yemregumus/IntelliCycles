import React from "react";
import { Container } from "react-bootstrap";
import { GiFairyWand } from "react-icons/gi";

const IntelliWandWindow = () => {
    return (
        <Container className="text-white text-center my-5 rounded-3xl bg-zinc-950 bg-opacity-70 p-3 h-full flex flex-col justify-between">
            <div className="bg-teal-950 rounded-full text-xl py-3">
                IntelliWand
            </div>
            <div className="flex-grow"></div>
            <GiFairyWand className="bg-teal-950 p-3 rounded-full mx-auto" color="white" size={80}/>
        </Container>
    );
}

export default IntelliWandWindow;