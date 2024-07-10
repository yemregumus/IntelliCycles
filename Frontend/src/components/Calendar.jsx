import React, {useEffect, useState} from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from '@fullcalendar/multimonth';
import { EditDialog } from './EditForms';
import { getUserIdFromToken } from '../utils/auth';
import { ConeStriped } from 'react-bootstrap-icons';
import { getActivitiesByUser } from '../../api';
import { toast } from 'react-hot-toast';
import { all } from 'axios';

function Calendar() {

  const [currentEvents, setCurrentEvents] = useState([]);
  const [tasksUpdated, setTasksUpdated] = useState(false);
  const [event, setEvent] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const userId = getUserIdFromToken();

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (info) => {
    console.log(info.event);

    const startDate = info.event.start instanceof Date ? info.event.start.toISOString() : info.event.start;
    const endDate = info.event.end instanceof Date ? info.event.end.toISOString() : info.event.end;

    console.log(startDate);
    console.log(endDate);

    const selectedEvent = {
      id: info.event.id,
      name: info.event.title,
      description: info.event.extendedProps.description,
      startDateTime: startDate,
      endDateTime: endDate,
      color: info.event.backgroundColor,
      repeatInterval: info.event.extendedProps.interval,
      type: info.event.extendedProps.type,
    };
    setEvent(selectedEvent);
    setShowEditDialog(true)
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const entities = await getActivitiesByUser(userId);
        if (entities) {
          if (entities.length === 0) {
            toast.success("You currently do not have any events set");
          } else {

            // filter out only events
            const validEntities = entities.filter(entity => entity.endDateTime);

            const calendarEvents = validEntities.map(entity => ({
              id: entity.id,
              title: entity.name,
              type: entity.type,
              start: entity.startDateTime,
              end: entity.endDateTime,
              color: entity.color,
              interval: entity.repeatInterval,
              description: entity.description,
              allDay: true,
              // You can add more properties here as needed
            }));
      
            // Sort tasks by due date and time
            //calendarEvents.sort((a, b) => new Date(a.start) - new Date(b.start));
            setCurrentEvents(calendarEvents);
            console.log("Fetched tasks before map:", validEntities);
            console.log("Fetched tasks:", calendarEvents);

          
          }
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };
    fetchEvents();
  
  }, [userId, tasksUpdated]);

  return (
    <div className="m-5">
        <div className="flex justify-between">
            <div className="flex-1 ml-4">
                <FullCalendar
                    height="75vh"
                    plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                        multiMonthPlugin
                    ]}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth,multiMonthYear",
                    }}
                    initialView="dayGridMonth"
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleDateClick}
                    eventClick={handleEventClick}
                    events={currentEvents}
                />
            </div>
        </div>
        <EditDialog
                show={showEditDialog}
                type="event"
                entity={event}
                handleClose={() => setShowEditDialog(false)}
                updateTasks={() => setTasksUpdated(!tasksUpdated)}
            />
    </div>
  )
}

export default Calendar