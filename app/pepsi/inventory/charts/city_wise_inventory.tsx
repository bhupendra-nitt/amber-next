import React from 'react';
import styled from 'styled-components';
import { BarChart, Bar, Cell } from 'recharts';

interface InventoryItem {
  city: string;
  region: string;
  onHandInventory: number;
  onHandRiyal: number;
  pointOfDistribution: number;
  avgQtyInHand: number;
  avgRiyalInHand: number;
  avgWeeklySales: number;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
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

const BarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const BarValue = styled.span`
  margin-left: 8px;
`;

const generateRandomData = (count: number): InventoryItem[] => {
  const cities = ['Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Taif', 'Tabuk', 'Buraidah'];
  const regions = ['Central', 'Western', 'Eastern', 'Northern', 'Southern'];

  return Array.from({ length: count }, () => ({
    city: cities[Math.floor(Math.random() * cities.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    onHandInventory: Math.floor(Math.random() * 10000),
    onHandRiyal: parseFloat((Math.random() * 100000).toFixed(2)),
    pointOfDistribution: Math.floor(Math.random() * 100),
    avgQtyInHand: Math.floor(Math.random() * 5000),
    avgRiyalInHand: parseFloat((Math.random() * 50000).toFixed(2)),
    avgWeeklySales: Math.floor(Math.random() * 1000),
  }));
};

const BarInCell: React.FC<{ value: number; max: number }> = ({ value, max }) => {
  const data = [{ value }];
  return (
    <BarContainer>
      <BarChart width={100} height={20} data={data}>
        <Bar dataKey="value" fill="#8884d8">
          <Cell fill="#8884d8" />
        </Bar>
      </BarChart>
      <BarValue>{value}</BarValue>
    </BarContainer>
  );
};

const TopInventoryByCityTable: React.FC = () => {
  const inventoryData = generateRandomData(10).sort((a, b) => b.onHandInventory - a.onHandInventory);
  const maxInventory = Math.max(...inventoryData.map(item => item.onHandInventory));

  return (
    <Table>
      <thead>
      <tr>
        <Th>City</Th>
        <Th>Region</Th>
        <Th>On Hand Inventory</Th>
        <Th>On Hand Riyal</Th>
        <Th>Point of Distribution</Th>
        <Th>Avg Qty in Hand</Th>
        <Th>Avg Riyal in Hand</Th>
        <Th>Avg Weekly Sales</Th>
      </tr>
      </thead>
      <tbody>
      {inventoryData.map((item, index) => (
        <tr key={index}>
          <Td>{item.city}</Td>
          <Td>{item.region}</Td>
          <Td><BarInCell value={item.onHandInventory} max={maxInventory} /></Td>
          <Td>{item.onHandRiyal.toFixed(2)}</Td>
          <Td>{item.pointOfDistribution}</Td>
          <Td>{item.avgQtyInHand}</Td>
          <Td>{item.avgRiyalInHand.toFixed(2)}</Td>
          <Td>{item.avgWeeklySales}</Td>
        </tr>
      ))}
      </tbody>
    </Table>
  );
};

export default TopInventoryByCityTable;