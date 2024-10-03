import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface InventoryItem {
  sku: string;
  name: string;
  barcode: string;
  inHandQty: number;
  inHandRiyal: number;
  pointOfDistribution: number;
  avgOnHandQty: number;
  avgOnHandRiyal: number;
  avgWeeklySales: number;
}

interface InventoryReportProps {
  items: InventoryItem[];
}


const InventoryProductReport: React.FC<InventoryReportProps> = ({ items }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Inventory by Product</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>SKU</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Barcode</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>In Hand Qty</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>In Hand Riyal</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Point of Distribution</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Avg On Hand Qty</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Avg On Hand Riyal</th>
          <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>Avg Weekly Sales</th>
        </tr>
        </thead>
        <tbody>
        {items.map((item) => (
          <tr key={item.sku}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.sku}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.name}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.barcode}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{item.inHandQty}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{item.inHandRiyal.toFixed(2)}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{item.pointOfDistribution}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{item.avgOnHandQty}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{item.avgOnHandRiyal.toFixed(2)}</td>
            <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>{item.avgWeeklySales}</td>
          </tr>
        ))}
        </tbody>
      </table>

      <h3>In Hand Quantity by SKU</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={items}>
            <XAxis dataKey="sku" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="inHandQty" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InventoryProductReport;