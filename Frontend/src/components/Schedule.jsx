import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";

const Schedule = () => {
  return (
    <Container className="text-white text-center my-5 rounded-3xl bg-zinc-950 bg-opacity-70 py-3 px-5 h-full flex flex-col justify-between">
      <div>
        <Row className="pb-4">
          <Col className="border-2 bg-sky-800 rounded-full max-w-14 text-3xl mx-auto p-2">S</Col>
          <Col className="border-2 bg-sky-800 rounded-full max-w-14 text-3xl mx-auto p-2">M</Col>
          <Col className="border-2 bg-sky-800 rounded-full max-w-14 text-3xl mx-auto p-2">T</Col>
          <Col className="border-2 bg-sky-800 rounded-full max-w-14 text-3xl mx-auto p-2">W</Col>
          <Col className="border-2 bg-sky-800 rounded-full max-w-14 text-3xl mx-auto p-2">T</Col>
          <Col className="border-2 bg-sky-800 rounded-full max-w-14 text-3xl mx-auto p-2">F</Col>
          <Col className="border-2 bg-sky-800 rounded-full max-w-14 text-3xl mx-auto p-2">S</Col>
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
      <IoMdAdd className="bg-teal-800 hover:bg-teal-950 transition duration-200 p-3 rounded-full mx-auto" color="white" size={80} />
    </Container>
  );
};

export default Schedule;
