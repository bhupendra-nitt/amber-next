import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Define the structure of our data
interface SalesData {
  date: string;
  unitsSold: number;
}

// Define our product SKUs
const pepsiProducts = [
  { sku: 'PEPSI001', name: 'Pepsi Cola 12oz' },
  { sku: 'PEPSI002', name: 'Diet Pepsi 12oz' },
  { sku: 'PEPSI003', name: 'Pepsi Max 12oz' },
  { sku: 'PEPSI004', name: 'Mountain Dew 12oz' },
];

// Generate mock data for a month
const generateMockData = (): SalesData[] => {
  const data: SalesData[] = [];
  const startDate = new Date('2024-07-01');

  for (let i = 0; i < 31; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const unitsSold = Math.floor(Math.random() * 10000) + 5000; // Random units between 5000 and 15000

    data.push({
      date: currentDate.toISOString().split('T')[0],
      unitsSold,
    });
  }

  return data;
};

const PepsiUnitsSoldChart: React.FC = () => {
  const salesData = generateMockData();

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Pepsi Products - Total Units Sold (July 2024)</h2>
      <ResponsiveContainer>
        <LineChart
          data={salesData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="unitsSold" stroke="#8884d8" activeDot={{ r: 8 }} name="Units Sold" />
        </LineChart>
      </ResponsiveContainer>
      {/*<div>*/}
      {/*  <h3>Products Included:</h3>*/}
      {/*  <ul>*/}
      {/*    {pepsiProducts.map((product) => (*/}
      {/*      <li key={product.sku}>{product.name} (SKU: {product.sku})</li>*/}
      {/*    ))}*/}
      {/*  </ul>*/}
      {/*</div>*/}
    </div>
  );
};

export default PepsiUnitsSoldChart;