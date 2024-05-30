import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoMdCheckmark } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Schedule = () => {
  const navigate = useNavigate();

  return (
    <Container className="text-white mt-4 rounded-3xl bg-zinc-950 bg-opacity-60 p-4 px-5 h-full flex flex-col justify-between">
      <div>
        <div className="text-center border-b-2 text-3xl py-3 max-w-52 mx-auto" >
          ADD
        </div>
        <Row>
          <Col className="text-2xl">
            NAME
          </Col>
          <Col>
            
          </Col>
        </Row>
      </div>
      <IoMdCheckmark className="bg-teal-800 hover:bg-teal-950 transition duration-150 p-3 rounded-full mx-auto" color="white" size={80} onClick={() => navigate('/add')} />
    </Container>
  );
};

export default Schedule;