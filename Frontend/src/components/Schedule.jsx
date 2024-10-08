import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { IoMdAdd } from "react-icons/io";
import { Badge } from "../components";
import { useNavigate } from "react-router-dom";
import { getActivitiesByUser } from "../../api";
import { getUserIdFromToken } from "../utils/auth";
import { toast } from 'react-hot-toast';
import moment from 'moment';
import PropTypes from "prop-types";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Schedule = ({ type = "" }) => {
  const [tasksUpdated, setTasksUpdated] = useState(false);
  const navigate = useNavigate();
  const title = type ? `${type.toUpperCase()}S` : "HOME";
  const userid = getUserIdFromToken();
  const [entities, setentities] = useState([]);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const fetchedEntities = await getActivitiesByUser(userid);
        let finalEntities = fetchedEntities;
  
        if (type) {
          finalEntities = fetchedEntities.filter(entity => entity.type === type);
          console.log("Filtered entities:", finalEntities);
        }
  
        if (finalEntities.length === 0) {
          toast.success("You currently do not have any tasks");
        } else {
          // Sort tasks by due date and time
          finalEntities.sort((a, b) => new Date(a.dueDateTime) - new Date(b.dueDateTime));
          setentities(finalEntities);
          // console.log("Fetched tasks:", finalEntities);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        toast.error('Error fetching tasks');
      }
    };
  
    fetchEntities();
  }, [userid, tasksUpdated]);

  // Organize tasks by day of the week and sort each day's tasks by due date and time
  const entitiesByDay = daysOfWeek.map(() => []);
  entities.forEach(entity => {
    const day = moment(entity.dueDateTime || entity.startDateTime || entity.reminderDateTime).day();
    entitiesByDay[day].push(entity);
  });

  // Sort tasks within each day
  entitiesByDay.forEach(dayEntities => {
    dayEntities.sort((a, b) => new Date(a.dueDateTime) - new Date(b.dueDateTime));
  });

  // Calculate the maximum number of tasks in any given day
  const maxEntities = Math.max(...entitiesByDay.map(dayEntities => dayEntities.length));

  return (
    <Container className="text-white text-center mt-4 rounded-3xl bg-zinc-950 bg-opacity-60 p-3 px-2 h-full flex flex-col justify-between">
      <div>
        <div className="text-3xl border-b-2 text-center pb-3 my-4 w-2/5 mx-auto">{title}</div>
          <Row className="pb-3 px-4">
            {daysOfWeek.map((day, index) => (
              <Col key={index} className="backdrop-blur-sm bg-white/30 rounded-full max-w-14 text-3xl mx-auto p-2">
                {day.charAt(0)}
              </Col>
            ))}
          </Row>
        <div className="overflow-y-auto h-[30rem] overflow-x-hidden px-4">
          <div className="">
            {[...Array(maxEntities)].map((_, rowIndex) => (
              <Row key={rowIndex}>
                {daysOfWeek.map((_, colIndex) => (
                  <Col key={colIndex} className="border-x-2 border-rose-900 text-3xl">
                    {entitiesByDay[colIndex][rowIndex] ? (
                      <Badge key={`${colIndex}-${rowIndex}`} entity={entitiesByDay[colIndex][rowIndex]} updateTasks={() => setTasksUpdated(!tasksUpdated)}/>
                    ) : null}
                  </Col>
                ))}
              </Row>
            ))}
          </div>
        </div>
      </div>
      {title === "HOME" ? (
        <IoMdAdd
          className="bg-teal-800 hover:bg-teal-950 transition duration-150 p-3 rounded-full mx-auto"
          color="white"
          size={80}
          onClick={() => navigate(`/add/task`)}
        />
      ) : (
        <IoMdAdd
          className="bg-teal-800 hover:bg-teal-950 transition duration-150 p-3 rounded-full mx-auto"
          color="white"
          size={80}
          onClick={() => navigate(`/add/${type}`)}
        />
      )}
    </Container>
  );
};

Schedule.propTypes = {
  type: PropTypes.string,
};

export default Schedule;
