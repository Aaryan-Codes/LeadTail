import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const StagePieChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);
    console.log(data);

  useEffect(() => {

    if(!data || data.length===0){
        return;
    }
    // Count the number of leads for each stage
    const stageCount = data.reduce((acc, lead) => {
      acc[lead.stage] = (acc[lead.stage] || 0) + 1;
      return acc;
    }, {});

    console.log(stageCount);

    // Transform the counted data into an array of objects for the pie chart
    const formattedData = Object.keys(stageCount).map(stage => ({
      name: stage,
      value: stageCount[stage]
    }));

    setChartData(formattedData);
  }, [data]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6347', '#7B68EE', '#32CD32', '#FFD700', '#6495ED', '#DC143C'];

  const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${chartData[index].name}`}
    </text>
  );
};
  
  return (
    <>
    <div className='p-2 flex flex-col items-center'>
    <h1 className='text-center text-3xl font-semibold'>Stages</h1>
    <PieChart width={420} height={400}>
      <Pie
        data={chartData}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={150}
        fill="#8884d8"
        dataKey="value"
        label={renderCustomizedLabel}
      >
        {chartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
    </div>
    </>
  );
};

export default StagePieChart;
