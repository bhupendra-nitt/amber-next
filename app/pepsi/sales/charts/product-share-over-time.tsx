import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProductData {
  sku: string;
  name: string;
  color: string;
}

interface SalesData {
  date: string;
  [key: string]: number | string;
}

const products: ProductData[] = [
  { sku: 'PEPSI001', name: 'Pepsi Cola 12oz', color: '#0000FF' },
  { sku: 'PEPSI002', name: 'Diet Pepsi 12oz', color: '#FF0000' },
  { sku: 'PEPSI003', name: 'Pepsi Max 12oz', color: '#000000' },
  { sku: 'PEPSI004', name: 'Mountain Dew 12oz', color: '#00FF00' },
  { sku: 'PEPSI005', name: 'Mirinda Orange 12oz', color: '#FFA500' },
];

const generateMockData = (): SalesData[] => {
  const data: SalesData[] = [];
  const startDate = new Date('2024-07-01');

  for (let i = 0; i < 31; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const dayData: SalesData = {
      date: currentDate.toISOString().split('T')[0],
    };

    let total = 0;
    products.forEach(product => {
      const sales = Math.floor(Math.random() * 1000) + 100;
      dayData[product.sku] = sales;
      total += sales;
    });

    // Convert to percentages
    products.forEach(product => {
      dayData[product.sku] = Number(((dayData[product.sku] as number) / total * 100).toFixed(2));
    });

    data.push(dayData);
  }

  return data;
};

const ProductShareChart: React.FC = () => {
  const salesData = generateMockData();

  return (
    <div style={{ width: '100%', height: 600 }}>
      <h2>Product Share Over Time (July 2024)</h2>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '80%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {products.map((product) => (
                <Bar
                  key={product.sku}
                  dataKey={product.sku}
                  stackId="a"
                  fill={product.color}
                  name={product.name}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ width: '20%', padding: '20px' }}>
          <h3>Products:</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {products.map((product) => (
              <li key={product.sku} style={{ marginBottom: '10px' }}>
                <span style={{
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  backgroundColor: product.color,
                  marginRight: '10px'
                }}></span>
                {product.name} (SKU: {product.sku})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductShareChart;