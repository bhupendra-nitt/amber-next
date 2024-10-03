import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Product {
  id: number;
  name: string;
  barcode: string;
  salesQty: number;
  salesValue: number;
  storeCount: number;
}

const TopSellingProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<'salesValue' | 'salesQty'>('salesValue');

  useEffect(() => {
    // Simulating API call to fetch data
    const fetchData = () => {
      const mockData: Product[] = [
        { id: 1, name: 'Pepsi Cola 12oz', barcode: '123456789', salesQty: 10000, salesValue: 50000, storeCount: 500 },
        { id: 2, name: 'Diet Pepsi 12oz', barcode: '234567890', salesQty: 8000, salesValue: 40000, storeCount: 450 },
        { id: 3, name: 'Pepsi Max 12oz', barcode: '345678901', salesQty: 6000, salesValue: 30000, storeCount: 400 },
        { id: 4, name: 'Mountain Dew 12oz', barcode: '456789012', salesQty: 9000, salesValue: 45000, storeCount: 480 },
        { id: 5, name: 'Mirinda Orange 12oz', barcode: '567890123', salesQty: 7000, salesValue: 35000, storeCount: 420 },
      ];
      setProducts(mockData);
    };

    fetchData();
  }, []);

  const sortedProducts = [...products].sort((a, b) => b[sortBy] - a[sortBy]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Top Selling Products</h2>
      <div style={styles.sortControl}>
        <label>Sort by: </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'salesValue' | 'salesQty')}
          style={styles.select}
        >
          <option value="salesValue">Sales Value</option>
          <option value="salesQty">Sales Quantity</option>
        </select>
      </div>

      <div style={styles.chartContainer}>
        <h3>Sales Quantity</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedProducts} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey="salesQty" fill="#8884d8" name="Sales Quantity" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={styles.chartContainer}>
        <h3>Sales Value (SAR)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sortedProducts} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey="salesValue" fill="#82ca9d" name="Sales Value (SAR)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <table style={styles.table}>
        <thead>
        <tr>
          <th style={styles.th}>Rank</th>
          <th style={styles.th}>Product Name</th>
          <th style={styles.th}>Barcode</th>
          <th style={styles.th}>Sales QTY</th>
          <th style={styles.th}>Sales Riyal</th>
          <th style={styles.th}>Store Count</th>
        </tr>
        </thead>
        <tbody>
        {sortedProducts.map((product, index) => (
          <tr key={product.id}>
            <td style={styles.td}>{index + 1}</td>
            <td style={styles.td}>{product.name}</td>
            <td style={styles.td}>{product.barcode}</td>
            <td style={styles.td}>{product.salesQty.toLocaleString()}</td>
            <td style={styles.td}>{product.salesValue.toLocaleString()} SAR</td>
            <td style={styles.td}>{product.storeCount.toLocaleString()}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center' as const,
    color: '#333',
  },
  sortControl: {
    marginBottom: '20px',
  },
  select: {
    padding: '5px',
    marginLeft: '10px',
  },
  chartContainer: {
    marginBottom: '30px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  th: {
    backgroundColor: '#f2f2f2',
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left' as const,
  },
  td: {
    border: '1px solid #ddd',
    padding: '12px',
  },
};

export default TopSellingProducts;