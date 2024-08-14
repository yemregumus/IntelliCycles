import React, {useEffect, useState} from 'react'
import {FaTasks} from 'react-icons/fa'
import { MdOutlineEventAvailable } from "react-icons/md";
import { LuAlarmClock, LuCalendarClock } from "react-icons/lu";
import PropTypes from 'prop-types'
import { getActivitiesByUser } from "../../api";
import { getUserIdFromToken } from '../utils/auth';


function StatsGrid() {
    const [totalTasks, setTotalTasks] = useState(0);
    const [totalHabits, setTotalHabits] = useState(0);
    const [totalEvents, setTotalEvents] = useState(0);
    const [totalReminders, setTotalReminders] = useState(0);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const fetchedActivities = await getActivitiesByUser(getUserIdFromToken());
                if (fetchedActivities) {
                    setTotalTasks(fetchedActivities.filter(activity => activity.type === 'task').length);
                    setTotalHabits(fetchedActivities.filter(activity => activity.type === 'habit').length);
                    setTotalEvents(fetchedActivities.filter(activity => activity.type === 'event').length);
                    setTotalReminders(fetchedActivities.filter(activity => activity.type === 'reminder').length);
                }
                console.log("Fetched activities:", fetchedActivities);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        };
        fetchActivities();
    }, []);
  return (
    <div className="flex gap-4">
        <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-teal-700">
                <LuAlarmClock className="text-2xl text-white" />
            </div>
            <div className="pl-4">
                <span className="text-sm text-gray-300 font-semibold">Total Habits</span>
                <div className="flex items-center">
                    <strong className="text-xl font-semibold">{totalHabits}</strong>
                </div>
                <span className="text-sm text-gray-300 pl-2 font-light">Last 24 hours</span>

            </div>
        </BoxWrapper>
        <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-900">
                <FaTasks className="text-2xl text-white" />
            </div>
            <div className="pl-4">
                <span className="text-sm text-gray-300 font-semibold">Total Tasks</span>
                <div className="flex items-center">
                    <strong className="text-xl font-semibold">{totalTasks}</strong>
                </div>
                <span className="text-sm text-gray-300 pl-2 font-light">Last 24 hours</span>

            </div>
        </BoxWrapper>
        <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-700">
                <MdOutlineEventAvailable className="text-2xl text-white" />
            </div>
            <div className="pl-4">
                <span className="text-sm text-gray-300 font-semibold">Total Events</span>
                <div className="flex items-center">
                    <strong className="text-xl font-semibold">{totalEvents}</strong>
                </div>
                <span className="text-sm text-gray-300 pl-2 font-light">Last 24 hours</span>

            </div>
        </BoxWrapper>
        <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-lime-800">
                <LuCalendarClock className="text-2xl text-white" />
            </div>
            <div className="pl-4">
                <span className="text-sm text-gray-300 font-semibold">Total Reminders</span>
                <div className="flex items-center">
                    <strong className="text-xl font-semibold">{totalReminders}</strong>
                    {/* <span className="text-sm text-red-500 pl-2">-1</span> */}
                </div>
                <span className="text-sm text-gray-300 pl-2 font-light">Last 24 hours</span>

            </div>
        </BoxWrapper>
    </div>
  )
}

function BoxWrapper({ children }) {
	return <div className="bg-black rounded-lg p-4 flex-1 flex items-center">{children}</div>
}

BoxWrapper.propTypes = {
    children: PropTypes.node
}

export default StatsGrid
