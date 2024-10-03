import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataPoint {
  date: string;
  totalQuantity: number;
  distributionCenter: number;
  inStore: number;
}

interface InventoryGraphProps {
  squNumber: string;
  retailer: string;
  days: number;
}

const generateRandomData = (days: number): DataPoint[] => {
  const data: DataPoint[] = [];
  const startDate = new Date();

  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const distributionCenter = Math.floor(Math.random() * 1000);
    const inStore = Math.floor(Math.random() * 500);

    data.push({
      date: currentDate.toISOString().split('T')[0],
      distributionCenter,
      inStore,
      totalQuantity: distributionCenter + inStore,
    });
  }

  return data;
};

const InventoryGraph: React.FC<InventoryGraphProps> = ({ squNumber, retailer, days }) => {
  const data = generateRandomData(days);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>{`Inventory for SQU ${squNumber} at ${retailer}`}</h2>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalQuantity" stroke="#8884d8" name="Total Quantity" />
          <Line type="monotone" dataKey="distributionCenter" stroke="#82ca9d" name="Distribution Center" />
          <Line type="monotone" dataKey="inStore" stroke="#ffc658" name="In-Store" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InventoryGraph;