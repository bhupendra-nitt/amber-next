import React from 'react';

interface SalesData {
  totalQuantity: number;
  totalSales: number;
  totalOrders: number;
}

const generateMockData = (): SalesData => {
  return {
    totalQuantity: Math.floor(Math.random() * 100000) + 50000,
    totalSales: Math.floor(Math.random() * 1000000) + 500000,
    totalOrders: Math.floor(Math.random() * 10000) + 5000,
  };
};

const Card: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
  <div style={styles.card}>
    <h3 style={styles.cardTitle}>{title}</h3>
    <p style={styles.cardValue}>{value}</p>
  </div>
);

const SalesSummaryCards: React.FC = () => {
  const salesData = generateMockData();

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Sales Summary (July 2024)</h2>
      <div style={styles.cardContainer}>
        <Card title="Total Quantity" value={salesData.totalQuantity.toLocaleString()} />
        <Card title="Total Sales" value={`$${salesData.totalSales.toLocaleString()}`} />
        <Card title="Total Orders" value={salesData.totalOrders.toLocaleString()} />
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  header: {
    textAlign: 'center' as const,
    color: '#333',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap' as const,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '10px',
    minWidth: '200px',
    textAlign: 'center' as const,
  },
  cardTitle: {
    color: '#666',
    fontSize: '1.1em',
    marginBottom: '10px',
  },
  cardValue: {
    color: '#333',
    fontSize: '1.8em',
    fontWeight: 'bold' as const,
    margin: 0,
  },
};

export default SalesSummaryCards;