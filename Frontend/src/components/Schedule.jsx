import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";

const Schedule = () => {
  return (
    <Container className="text-white text-center my-5 rounded-3xl bg-zinc-950 bg-opacity-70 p-5 h-full flex flex-col justify-between">
      <div>
        <Row>
          <Col className="border-2 bg-emerald-950 rounded-full max-w-14 text-3xl mx-auto">S</Col>
          <Col className="border-2 bg-emerald-950 rounded-full max-w-14 text-3xl mx-auto">M</Col>
          <Col className="border-2 bg-emerald-950 rounded-full max-w-14 text-3xl mx-auto">T</Col>
          <Col className="border-2 bg-emerald-950 rounded-full max-w-14 text-3xl mx-auto">W</Col>
          <Col className="border-2 bg-emerald-950 rounded-full max-w-14 text-3xl mx-auto">T</Col>
          <Col className="border-2 bg-emerald-950 rounded-full max-w-14 text-3xl mx-auto">F</Col>
          <Col className="border-2 bg-emerald-950 rounded-full max-w-14 text-3xl mx-auto">S</Col>
        </Row>
        <Row>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
        </Row>
        <Row>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
        </Row>
        <Row>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
        </Row>
        <Row>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
        </Row>
        <Row>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
        </Row>
        <Row>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
          <Col className="border-x-2 text-3xl">.</Col>
        </Row>
      </div>
      <IoMdAdd className="bg-black p-3 rounded-full mx-auto" color="white" size={80} />
    </Container>
  );
};

export default Schedule;
