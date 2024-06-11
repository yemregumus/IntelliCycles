import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import {Badge} from "../components"
import { useNavigate } from "react-router-dom";

const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];
const numRows = 11;
const numCols = 7;

const Schedule = ({type=""}) => {
  const navigate = useNavigate();
  const title = type ? `${type.toUpperCase()}S` : "HOME";

  return (
    <Container className="text-white text-center mt-4 rounded-3xl bg-zinc-950 bg-opacity-60 p-3 px-5 h-full flex flex-col justify-between">
      <div>
        <div className="text-3xl border-b-2 text-center pb-3 my-4 w-2/5 mx-auto">{title}</div>
        <Row className="pb-4">
          {daysOfWeek.map((day, index) => (
            <Col key={index} className="backdrop-blur-sm bg-white/30 rounded-full max-w-14 text-3xl mx-auto p-2 mb-2">
              {day}
            </Col>
          ))}
        </Row>
        <div className="">
          {[...Array(numRows)].map((_, rowIndex) => (
            <Row key={rowIndex}>
              {[...Array(numCols)].map((_, colIndex) => (
                <Col key={colIndex} className="border-x-2 border-rose-900 text-3xl"><Badge type= {type}/></Col>
              ))}
            </Row>
          ))}
        </div>
      </div>
      { title==="HOME" ?
        <IoMdAdd className="bg-teal-800 hover:bg-teal-950 transition duration-150 p-3 rounded-full mx-auto" color="white" size={80} onClick={() => navigate(`/add/task`)} />
        :
        <IoMdAdd className="bg-teal-800 hover:bg-teal-950 transition duration-150 p-3 rounded-full mx-auto" color="white" size={80} onClick={() => navigate(`/add/${type}`)} />
      }
    </Container>
  );
};

export default Schedule;
