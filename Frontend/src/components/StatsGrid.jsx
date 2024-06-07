import React from 'react'
import {FaTasks} from 'react-icons/fa'
import { MdOutlineEventAvailable } from "react-icons/md";
import { LuAlarmClock, LuCalendarClock } from "react-icons/lu";

function StatsGrid() {
  return (
    <div className="flex gap-4">
        <BoxWrapper>
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-teal-700">
                <LuAlarmClock className="text-2xl text-white" />
            </div>
            <div className="pl-4">
                <span className="text-sm text-gray-300 font-semibold">Total Habits</span>
                <div className="flex items-center">
                    <strong className="text-xl text-gray-700 font-semibold">32</strong>
                    <span className="text-sm text-green-500 pl-2">+10</span><br/>
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
                    <strong className="text-xl text-gray-700 font-semibold">50</strong>
                    <span className="text-sm text-green-500 pl-2">+20</span>
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
                    <strong className="text-xl text-gray-700 font-semibold">30</strong>
                    <span className="text-sm text-red-500 pl-2">-10</span>
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
                    <strong className="text-xl text-gray-700 font-semibold">10</strong>
                    <span className="text-sm text-red-500 pl-2">-1</span>
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

export default StatsGrid
