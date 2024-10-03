import React from 'react';

interface InventoryItem {
  squNumber: string;
  qtyPerCarton: number;
  pricePerUnit: number;
  distributionCenterQty: number;
  inStoreQty: number;
}

interface ReportProps {
  retailer: string;
  items: InventoryItem[];
}


const InventoryReport: React.FC<ReportProps> = ({ retailer, items }) => {
  const calculateTotals = () => {
    let totalUnits = 0;
    let totalCartons = 0;
    let totalValue = 0;

    items.forEach(item => {
      const totalQty = item.distributionCenterQty + item.inStoreQty;
      totalUnits += totalQty;
      totalCartons += Math.ceil(totalQty / item.qtyPerCarton);
      totalValue += totalQty * item.pricePerUnit;
    });

    return { totalUnits, totalCartons, totalValue };
  };

  const { totalUnits, totalCartons, totalValue } = calculateTotals();

  return (
    <div>
      <h2>{`Inventory Report for ${retailer}`}</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>SQU Number</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Distribution Center Qty</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>In-Store Qty</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total Qty</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Cartons</th>
          <th style={{ border: '1px solid #ddd', padding: '8px' }}>Value (Riyal)</th>
        </tr>
        </thead>
        <tbody>
        {items.map(item => {
          const totalQty = item.distributionCenterQty + item.inStoreQty;
          const cartons = Math.ceil(totalQty / item.qtyPerCarton);
          const value = totalQty * item.pricePerUnit;
          return (
            <tr key={item.squNumber}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.squNumber}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.distributionCenterQty}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.inStoreQty}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{totalQty}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{cartons}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{value.toFixed(2)}</td>
            </tr>
          );
        })}
        </tbody>
        <tfoot>
        <tr style={{ backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>
          <td style={{ border: '1px solid #ddd', padding: '8px' }} colSpan={3}>Totals</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{totalUnits}</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{totalCartons}</td>
          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{totalValue.toFixed(2)}</td>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InventoryReport;