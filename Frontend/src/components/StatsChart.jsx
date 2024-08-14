import React, {useEffect} from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getActivitiesByUser } from "../../api";
import { getUserIdFromToken } from '../utils/auth';
import { curveCardinal } from 'd3-shape';

var data = [
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
      tasks: 0,
      habits: 0,
      events: 0,
      reminders: 0,
    },
    {
      name: 'JUN',
      tasks: 0,
      habits: 0,
      events: 0,
      reminders: 0,
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

const cardinal = curveCardinal.tension(0.2);

function StatsChart () {
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activities = await getActivitiesByUser(getUserIdFromToken());
        if (activities) {
          // sort activities by month
          const sortedActivities = activities.sort((a, b) => new Date(a.createDateTime) - new Date(b.createDateTime));
          console.log('Fetched activities in stats chart:', sortedActivities);
          // update data
          console.log('Old data:', data);
          const newData = data.map(month => {
            const monthActivities = sortedActivities.filter(activity => new Date(activity.createDateTime).getMonth() === data.indexOf(month));
            return {
              ...month,
              tasks: monthActivities.filter(activity => activity.type === 'task').length,
              habits: monthActivities.filter(activity => activity.type === 'habit').length,
              events: monthActivities.filter(activity => activity.type === 'event').length,
              reminders: monthActivities.filter(activity => activity.type === 'reminder').length,
            };
          });
          if (newData)
            data = newData;
          console.log('New data:', data);
        }
      } catch (error) {
        console.error('Failed to fetch activities:', error);
      }
    };
    fetchActivities();
  }, []);

  return (
    <div className="h-[22rem] bg-black p-10 rounded-sm border border-gray-200 flex flex-col flex-1">
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
                <Area type="monotone" dataKey="reminders" stroke="#4d7c0f" fill="#4d7c0f" fillOpacity={0.3}/>
                <Area type="monotone" dataKey="events" stroke="#ca8a04" fill="#ca8a04" fillOpacity={0.3}/>
                <Area type="monotone" dataKey="tasks" stroke="#7c2d12" fill="#7c2d12" fillOpacity={0.3}/>
                <Area type="monotone" dataKey="habits" stroke="#0d9488" fill="#0d9488" fillOpacity={0.3}/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
}

export default StatsChart