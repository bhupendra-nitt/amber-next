import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CityData {
  name: string;
  state: string;
  storeCount: number;
  pointOfDistribution: number;
  softDrinks: { qty: number; value: number };
  snacks: { qty: number; value: number };
  water: { qty: number; value: number };
}

const TopSellingCities: React.FC = () => {
  const [cities, setCities] = useState<CityData[]>([]);
  const [sortBy, setSortBy] = useState<'value' | 'quantity'>('value');

  useEffect(() => {
    // Simulating API call to fetch data
    const fetchData = () => {
      const mockData: CityData[] = [
        {
          name: 'Riyadh', state: 'Riyadh Province', storeCount: 100, pointOfDistribution: 500,
          softDrinks: { qty: 50000, value: 2500000 }, snacks: { qty: 30000, value: 1500000 }, water: { qty: 20000, value: 1000000 }
        },
        {
          name: 'Jeddah', state: 'Makkah Province', storeCount: 80, pointOfDistribution: 400,
          softDrinks: { qty: 40000, value: 2000000 }, snacks: { qty: 25000, value: 1250000 }, water: { qty: 15000, value: 750000 }
        },
        {
          name: 'Dammam', state: 'Eastern Province', storeCount: 60, pointOfDistribution: 300,
          softDrinks: { qty: 30000, value: 1500000 }, snacks: { qty: 18000, value: 900000 }, water: { qty: 12000, value: 600000 }
        },
        {
          name: 'Medina', state: 'Medina Province', storeCount: 50, pointOfDistribution: 250,
          softDrinks: { qty: 25000, value: 1250000 }, snacks: { qty: 15000, value: 750000 }, water: { qty: 10000, value: 500000 }
        },
        {
          name: 'Tabuk', state: 'Tabuk Province', storeCount: 30, pointOfDistribution: 150,
          softDrinks: { qty: 15000, value: 750000 }, snacks: { qty: 9000, value: 450000 }, water: { qty: 6000, value: 300000 }
        },
      ];
      setCities(mockData);
    };

    fetchData();
  }, []);

  const sortedCities = [...cities].sort((a, b) => {
    const aTotal = a.softDrinks[sortBy] + a.snacks[sortBy] + a.water[sortBy];
    const bTotal = b.softDrinks[sortBy] + b.snacks[sortBy] + b.water[sortBy];
    return bTotal - aTotal;
  });

  const chartData = sortedCities.map(city => ({
    name: city.name,
    'Soft Drinks': city[sortBy === 'value' ? 'softDrinks' : 'softDrinks'][sortBy],
    'Snacks': city[sortBy === 'value' ? 'snacks' : 'snacks'][sortBy],
    'Water': city[sortBy === 'value' ? 'water' : 'water'][sortBy],
  }));

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Top Selling Cities</h2>
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
          <th style={styles.th}>City</th>
          <th style={styles.th}>State</th>
          <th style={styles.th}>Store Count</th>
          <th style={styles.th}>Sales QTY</th>
          <th style={styles.th}>Sales Riyal</th>
          <th style={styles.th}>Point of Distribution</th>
        </tr>
        </thead>
        <tbody>
        {sortedCities.map((city) => (
          <tr key={city.name}>
            <td style={styles.td}>{city.name}</td>
            <td style={styles.td}>{city.state}</td>
            <td style={styles.td}>{city.storeCount}</td>
            <td style={styles.td}>{(city.softDrinks.qty + city.snacks.qty + city.water.qty).toLocaleString()}</td>
            <td style={styles.td}>{(city.softDrinks.value + city.snacks.value + city.water.value).toLocaleString()} SAR</td>
            <td style={styles.td}>{city.pointOfDistribution}</td>
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

export default TopSellingCities;