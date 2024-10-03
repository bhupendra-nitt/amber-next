'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RandomDataChart = () => {
  // Generate random data
  const generateRandomData = () => {
    const data = [];
    for (let i = 0; i < 7; i++) {
      data.push({
        day: `Day ${i + 1}`,
        value1: Math.floor(Math.random() * 100),
        value2: Math.floor(Math.random() * 100),
      });
    }
    return data;
  };

  const data = generateRandomData();

  return (
    <div style={{ width: '100%', height: 400 }}>
  <ResponsiveContainer>
    <LineChart
      data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="day" />
  <YAxis />
  <Tooltip />
  <Legend />
  <Line type="monotone" dataKey="value1" stroke="#8884d8" activeDot={{ r: 8 }} />
  <Line type="monotone" dataKey="value2" stroke="#82ca9d" />
    </LineChart>
    </ResponsiveContainer>
    </div>
);
};

export default RandomDataChart;