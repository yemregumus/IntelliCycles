import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'JAN',
      tasks: 0,
      habits: 0,
      events: 0,
      reminders: 0,
    },
    {
      name: 'FEB',
      tasks: 0,
      habits: 0,
      events: 0,
      reminders: 0,
    },
    {
      name: 'MAR',
      tasks: 0,
      habits: 0,
      events: 0,
      reminders: 0,
    },
    {
      name: 'APR',
      tasks: 0,
      habits: 0,
      events: 0,
      reminders: 0,
    },
    {
      name: 'MAY',
      tasks: 20,
      habits: 10,
      events: 30,
      reminders: 10,
    },
    {
      name: 'JUN',
      tasks: 30,
      habits: 15,
      events: 39,
      reminders: 5,
    },
    {
      name: 'JUL',
      tasks: 0,
      habits: 0,
      events: 0,
      reminders: 0,
    },
    {
        name: 'AUG',
        tasks: 0,
        habits: 0,
        events: 0,
        reminders: 0,
      },
      {
        name: 'SEP',
        tasks: 0,
        habits: 0,
        events: 0,
        reminders: 0,
      },
      {
        name: 'OCT',
        tasks: 0,
        habits: 0,
        events: 0,
        reminders: 0,
      },
      {
        name: 'NOV',
        tasks: 0,
        habits: 0,
        events: 0,
        reminders: 0,
      },
      {
        name: 'DEC',
        tasks: 0,
        habits: 0,
        events: 0,
        reminders: 0,
      },
];

function StatsChart () {
  return (
    <div className="h-[22rem] bg-black p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
        <div className="mt-3 w-full flex-1 text-xs">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="habits" stackId="1" stroke="#0d9488" fill="#0d9488" />
                <Area type="monotone" dataKey="tasks" stackId="1" stroke="#7c2d12" fill="#7c2d12" />
                <Area type="monotone" dataKey="events" stackId="1" stroke="#ca8a04" fill="#ca8a04" />
                <Area type="monotone" dataKey="reminders" stackId="1" stroke="#4d7c0f" fill="#4d7c0f" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
}

export default StatsChart