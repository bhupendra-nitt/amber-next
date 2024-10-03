import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Treemap, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Mock data generator for 100 products
const generateMockData = () => {
  const products = [];
  for (let i = 1; i <= 100; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      sales: {
        Jan: Math.floor(Math.random() * 100),
        Feb: Math.floor(Math.random() * 100),
        Mar: Math.floor(Math.random() * 100)
      },
      purchases: {
        Jan: Math.floor(Math.random() * 100),
        Feb: Math.floor(Math.random() * 100),
        Mar: Math.floor(Math.random() * 100)
      }
    });
  }
  return products;
};

const mockData = generateMockData();

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

const MultiProductSalesDashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('Jan');

  const totalSalesByMonth = mockData.reduce((acc, product) => {
    Object.entries(product.sales).forEach(([month, sales]) => {
      acc[month] = (acc[month] || 0) + sales;
    });
    return acc;
  }, {});

  const totalPurchasesByMonth = mockData.reduce((acc, product) => {
    Object.entries(product.purchases).forEach(([month, purchases]) => {
      acc[month] = (acc[month] || 0) + purchases;
    });
    return acc;
  }, {});

  const monthlySalesData = Object.entries(totalSalesByMonth).map(([month, sales]) => ({
    month,
    sales,
    purchases: totalPurchasesByMonth[month]
  }));

  const topSellingProducts = mockData
    .map(product => ({
      name: product.name,
      sales: product.sales[selectedMonth]
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 10);

  const productPerformance = mockData.map(product => ({
    name: product.name,
    sales: product.sales[selectedMonth],
    purchases: product.purchases[selectedMonth]
  }));

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Multi-Product Sales Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Total Sales and Purchases by Month</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" name="Sales" />
              <Bar dataKey="purchases" fill="#82ca9d" name="Purchases" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Sales Trend Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
              <Line type="monotone" dataKey="purchases" stroke="#82ca9d" name="Purchases" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="month-select" className="block mb-2 font-semibold">Select Month:</label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded p-2"
        >
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="Mar">March</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Top 10 Selling Products ({selectedMonth})</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topSellingProducts}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="sales"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {topSellingProducts.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Product Performance ({selectedMonth})</h2>
          <ResponsiveContainer width="100%" height={300}>
            <Treemap
              data={productPerformance}
              dataKey="sales"
              aspectRatio={4 / 3}
              stroke="#fff"
              fill="#8884d8"
            >
              <Tooltip content={<CustomTooltip />} />
            </Treemap>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border p-2 shadow-md">
        <p>{data.name}</p>
        <p>Sales: {data.sales}</p>
        <p>Purchases: {data.purchases}</p>
      </div>
    );
  }
  return null;
};

export default MultiProductSalesDashboard;