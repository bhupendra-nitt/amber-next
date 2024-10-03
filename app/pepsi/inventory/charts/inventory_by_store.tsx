import React from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StoreInventory {
  store: string;
  address: string;
  city: string;
  region: string;
  zipCode: string;
  onHandInventory: number;
  onHandRiyal: number;
  pointOfDistribution: number;
  avgQtyOnHand: number;
  avgInHandRiyal: number;
  avgWeeklySales: number;
  weeksOfSupply: number;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  margin-bottom: 20px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 20px;
`;

const generateRandomData = (count: number): StoreInventory[] => {
  const cities = ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Taif', 'Tabuk', 'Buraidah'];
  const regions = ['Central', 'Western', 'Eastern', 'Northern', 'Southern'];

  return Array.from({ length: count }, (_, index) => ({
    store: `Store ${index + 1}`,
    address: `${Math.floor(Math.random() * 1000)} Main St`,
    city: cities[Math.floor(Math.random() * cities.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    zipCode: Math.floor(10000 + Math.random() * 90000).toString(),
    onHandInventory: Math.floor(Math.random() * 10000),
    onHandRiyal: parseFloat((Math.random() * 100000).toFixed(2)),
    pointOfDistribution: Math.floor(Math.random() * 100),
    avgQtyOnHand: Math.floor(Math.random() * 5000),
    avgInHandRiyal: parseFloat((Math.random() * 50000).toFixed(2)),
    avgWeeklySales: Math.floor(Math.random() * 1000),
    weeksOfSupply: parseFloat((Math.random() * 10).toFixed(1)),
  }));
};

const InventoryByStoreTable: React.FC = () => {
  const inventoryData = generateRandomData(10);

  return (
    <>
      <Table>
        <thead>
        <tr>
          <Th>Store</Th>
          <Th>Address</Th>
          <Th>City</Th>
          <Th>Region</Th>
          <Th>Zip Code</Th>
          <Th>On Hand Inventory</Th>
          <Th>On Hand Riyal</Th>
          <Th>Point of Distribution</Th>
          <Th>Avg Qty on Hand</Th>
          <Th>Avg In Hand Riyal</Th>
          <Th>Avg Weekly Sales</Th>
          <Th>Weeks of Supply</Th>
        </tr>
        </thead>
        <tbody>
        {inventoryData.map((item, index) => (
          <tr key={index}>
            <Td>{item.store}</Td>
            <Td>{item.address}</Td>
            <Td>{item.city}</Td>
            <Td>{item.region}</Td>
            <Td>{item.zipCode}</Td>
            <Td>{item.onHandInventory}</Td>
            <Td>{item.onHandRiyal.toFixed(2)}</Td>
            <Td>{item.pointOfDistribution}</Td>
            <Td>{item.avgQtyOnHand}</Td>
            <Td>{item.avgInHandRiyal.toFixed(2)}</Td>
            <Td>{item.avgWeeklySales}</Td>
            <Td>{item.weeksOfSupply}</Td>
          </tr>
        ))}
        </tbody>
      </Table>

      <ChartContainer>
        <h2>Inventory and Sales by Store</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={inventoryData}>
            <XAxis dataKey="store" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="onHandInventory" stackId="a" fill="#8884d8" name="On Hand Inventory" />
            <Bar dataKey="avgQtyOnHand" stackId="a" fill="#82ca9d" name="Avg Qty on Hand" />
            <Bar dataKey="avgWeeklySales" stackId="a" fill="#ffc658" name="Avg Weekly Sales" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer>
        <h2>Financial Metrics by Store</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={inventoryData}>
            <XAxis dataKey="store" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="onHandRiyal" stackId="a" fill="#8884d8" name="On Hand Riyal" />
            <Bar dataKey="avgInHandRiyal" stackId="a" fill="#82ca9d" name="Avg In Hand Riyal" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  );
};

export default InventoryByStoreTable;