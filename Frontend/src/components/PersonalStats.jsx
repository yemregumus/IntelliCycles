import React from 'react'
import StatsGrid from './StatsGrid'
import StatsChart from './StatsChart'

function PersonalStats() {
  return (
    <div className="flex flex-col gap-4">
        <StatsGrid />
        <div className="flex flex-row gap-4 w-full">
            <StatsChart />
            {/* <BuyerProfilePieChart /> */}
        </div>
        
    </div>
  )
}

export default PersonalStats