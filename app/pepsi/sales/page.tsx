// @ts-nocheck
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "../../components/simple-card-components";
import salesData from '../../data/sales_data.json';
const monthNames = ["January", "February", "March", "April", "May", "June"];

const processData = (data) => {
  const monthlySales = monthNames.map(month => ({
    month,
    totalSales: data.reduce((acc, product) => {
      const monthSales = Object.values(product.sales[month] || {}).reduce((sum, sale) => sum + parseFloat(sale), 0);
      return acc + monthSales;
    }, 0)
  }));

  const topProducts = data.map(product => ({
    name: product.product.name,
    totalSales: monthNames.reduce((acc, month) => {
      const monthSales = Object.values(product.sales[month] || {}).reduce((sum, sale) => sum + parseFloat(sale), 0);
      return acc + monthSales;
    }, 0)
  })).sort((a, b) => b.totalSales - a.totalSales).slice(0, 5);

  return { monthlySales, topProducts };
};

const SalesAnalyticsDashboard = () => {
  const { monthlySales, topProducts } = processData(salesData.data);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Sales Analytics Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart width={600} height={300} data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalSales" stroke="#8884d8" />
          </LineChart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top 5 Products by Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart width={600} height={300} data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSales" fill="#82ca9d" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesAnalyticsDashboard;