import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';

const EmployeeBarChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);
    console.log(data);

  useEffect(() => {

    if(!data || data.length===0){
        return;
    }
    // Count the number of leads for each stage
    const stageCount = data.reduce((acc, lead) => {
      acc[lead.assigned] = (acc[lead.assigned] || 0) + 1;
      return acc;
    }, {});

    console.log(stageCount);

    // Transform the counted data into an array of objects for the pie chart
    const formattedData = Object.keys(stageCount).map(stage => ({
      name: stage,
      Leads: stageCount[stage]
    }));

    setChartData(formattedData);
  }, [data]);

  return (
    <>
    <div className='p-2 flex flex-col items-center'>
    <h1 className='text-center w-full text-3xl font-semibold'>Employees</h1>
        <BarChart width={500} height={400} data={chartData}>
          <XAxis dataKey={"name"} />
          <Tooltip/>
          <Bar dataKey="Leads" fill="#8884d8" />
        </BarChart>
    </div>
    </>
  );
};

export default EmployeeBarChart;
