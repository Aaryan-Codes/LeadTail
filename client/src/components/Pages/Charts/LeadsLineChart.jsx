import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LeadsByDateChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    if(!data || data.length===0){
        return;
    }

    // Initialize an object to count leads by date
    const leadsCount = data.reduce((acc, lead) => {
      acc[lead.date] = (acc[lead.date] || 0) + 1;
      return acc;
    }, {});

    // Transform the counted data into an array of objects for the chart
    let formattedData = Object.keys(leadsCount).map(date => ({
      date,
      Leads: leadsCount[date]
    }));

    formattedData = formattedData.sort((a,b)=>new Date(a.date) - new Date(b.date));

    setChartData(formattedData);
  }, [data]);

  return (
    <ResponsiveContainer width='100%' height={400}>
        
    <LineChart
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis tickFormatter={tick => Number.isInteger(tick) ? tick : ''} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Leads" stroke="#8884d8" />
    </LineChart>
    </ResponsiveContainer>
  );
};

export default LeadsByDateChart;
