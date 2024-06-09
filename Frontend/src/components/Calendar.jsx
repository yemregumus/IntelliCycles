import React, {useState} from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import multiMonthPlugin from '@fullcalendar/multimonth';
import { EditDialog } from './EditForms';

function Calendar() {

  const [currentEvents, setCurrentEvents] = useState([]);
  const [showEditDialog, setShowEditDialog] = useState(false);

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
                    eventClick={() => setShowEditDialog(true)}
                    eventsSet={(events) => setCurrentEvents(events)}
                    initialEvents={[
                        {
                            id: "12315",
                            title: "Task: Do Assignment",
                            date: "2024-06-14",
                        },
                        {
                            id: "5123",
                            title: "Habit: Drink Water",
                            date: "2024-06-28",
                        },
                    ]}
                />
            </div>
        </div>
        <EditDialog show={showEditDialog} type='event' handleClose={() => setShowEditDialog(false)} />
    </div>
  )
}

export default Calendar