import React from "react";
import { Container } from "react-bootstrap";
import { GiFairyWand } from "react-icons/gi";

const IntelliWandWindow = () => {
    return (
        <Container className="text-white text-center my-5 rounded-3xl bg-zinc-950 bg-opacity-70 p-5 h-full flex flex-col justify-between">
            <div className="flex-grow">
                hello
            </div>
            <GiFairyWand className="bg-black p-3 rounded-full mx-auto" color="white" size={80}/>
        </Container>
    );
}

export default IntelliWandWindow;