import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StoreData {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  pointOfDistribution: number;
  softDrinks: { qty: number; value: number };
  snacks: { qty: number; value: number };
  water: { qty: number; value: number };
}

const TopSellingStores: React.FC = () => {
  const [stores, setStores] = useState<StoreData[]>([]);
  const [sortBy, setSortBy] = useState<'value' | 'quantity'>('value');

  useEffect(() => {
    // Simulating API call to fetch data
    const fetchData = () => {
      const mockData: StoreData[] = [
        {
          name: 'Store A', address: '123 Main St', city: 'Riyadh', state: 'Riyadh Province', zipCode: '12345', pointOfDistribution: 50,
          softDrinks: { qty: 5000, value: 250000 }, snacks: { qty: 3000, value: 150000 }, water: { qty: 2000, value: 100000 }
        },
        {
          name: 'Store B', address: '456 Oak Rd', city: 'Jeddah', state: 'Makkah Province', zipCode: '23456', pointOfDistribution: 40,
          softDrinks: { qty: 4000, value: 200000 }, snacks: { qty: 2500, value: 125000 }, water: { qty: 1500, value: 75000 }
        },
        {
          name: 'Store C', address: '789 Pine Ave', city: 'Dammam', state: 'Eastern Province', zipCode: '34567', pointOfDistribution: 60,
          softDrinks: { qty: 6000, value: 300000 }, snacks: { qty: 3500, value: 175000 }, water: { qty: 2500, value: 125000 }
        },
        {
          name: 'Store D', address: '321 Cedar Ln', city: 'Medina', state: 'Medina Province', zipCode: '45678', pointOfDistribution: 45,
          softDrinks: { qty: 4500, value: 225000 }, snacks: { qty: 2800, value: 140000 }, water: { qty: 1700, value: 85000 }
        },
        {
          name: 'Store E', address: '654 Birch Blvd', city: 'Tabuk', state: 'Tabuk Province', zipCode: '56789', pointOfDistribution: 35,
          softDrinks: { qty: 3500, value: 175000 }, snacks: { qty: 2200, value: 110000 }, water: { qty: 1300, value: 65000 }
        },
      ];
      setStores(mockData);
    };

    fetchData();
  }, []);

  const sortedStores = [...stores].sort((a, b) => {
    const aTotal = a.softDrinks[sortBy] + a.snacks[sortBy] + a.water[sortBy];
    const bTotal = b.softDrinks[sortBy] + b.snacks[sortBy] + b.water[sortBy];
    return bTotal - aTotal;
  });

  const chartData = sortedStores.map(store => ({
    name: store.name,
    'Soft Drinks': store[sortBy === 'value' ? 'softDrinks' : 'softDrinks'][sortBy],
    'Snacks': store[sortBy === 'value' ? 'snacks' : 'snacks'][sortBy],
    'Water': store[sortBy === 'value' ? 'water' : 'water'][sortBy],
  }));

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Top Selling Stores</h2>
      <div style={styles.sortControl}>
        <label>Sort by: </label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'value' | 'quantity')}
          style={styles.select}
        >
          <option value="value">Sales Value</option>
          <option value="quantity">Sales Quantity</option>
        </select>
      </div>

      <div style={styles.chartContainer}>
        <h3>{sortBy === 'value' ? 'Sales Value (SAR)' : 'Sales Quantity'}</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Soft Drinks" stackId="a" fill="#8884d8" />
            <Bar dataKey="Snacks" stackId="a" fill="#82ca9d" />
            <Bar dataKey="Water" stackId="a" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <table style={styles.table}>
        <thead>
        <tr>
          <th style={styles.th}>Store</th>
          <th style={styles.th}>Address</th>
          <th style={styles.th}>City</th>
          <th style={styles.th}>State</th>
          <th style={styles.th}>Zip Code</th>
          <th style={styles.th}>Sales QTY</th>
          <th style={styles.th}>Sales Riyal</th>
          <th style={styles.th}>Point of Distribution</th>
        </tr>
        </thead>
        <tbody>
        {sortedStores.map((store) => (
          <tr key={store.name}>
            <td style={styles.td}>{store.name}</td>
            <td style={styles.td}>{store.address}</td>
            <td style={styles.td}>{store.city}</td>
            <td style={styles.td}>{store.state}</td>
            <td style={styles.td}>{store.zipCode}</td>
            <td style={styles.td}>{(store.softDrinks.qty + store.snacks.qty + store.water.qty).toLocaleString()}</td>
            <td style={styles.td}>{(store.softDrinks.value + store.snacks.value + store.water.value).toLocaleString()} SAR</td>
            <td style={styles.td}>{store.pointOfDistribution}</td>
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
    maxWidth: '1200px',
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

export default TopSellingStores;