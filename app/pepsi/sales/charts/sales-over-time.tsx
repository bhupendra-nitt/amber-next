import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface SalesData {
  day: string;
  Riyadh: number;
  Jeddah: number;
  Dammam: number;
  Mecca: number;
  Medina: number;
}

interface ColorMap {
  [key: string]: string;
}

const PepsiSalesChartOverTime: React.FC = () => {
  // Sample data for Pepsi product sales in Saudi Arabia regions
  const salesData: SalesData[] = [
    { day: '1', Riyadh: 1000, Jeddah: 1200, Dammam: 800, Mecca: 950, Medina: 750 },
    { day: '5', Riyadh: 1100, Jeddah: 1250, Dammam: 850, Mecca: 1000, Medina: 800 },
    { day: '10', Riyadh: 1300, Jeddah: 1400, Dammam: 900, Mecca: 1100, Medina: 850 },
    { day: '15', Riyadh: 1200, Jeddah: 1350, Dammam: 950, Mecca: 1050, Medina: 900 },
    { day: '20', Riyadh: 1400, Jeddah: 1500, Dammam: 1000, Mecca: 1200, Medina: 950 },
    { day: '25', Riyadh: 1350, Jeddah: 1450, Dammam: 1050, Mecca: 1150, Medina: 1000 },
    { day: '30', Riyadh: 1500, Jeddah: 1600, Dammam: 1100, Mecca: 1300, Medina: 1100 },
  ];

  const colors: ColorMap = {
    Riyadh: "#8884d8",
    Jeddah: "#82ca9d",
    Dammam: "#ffc658",
    Mecca: "#ff7300",
    Medina: "#a4de6c"
  };

  return (
    <div style={{ width: '100%', height: 400 }}>
      <h2>Pepsi Sales in Saudi Arabia Regions (1 Month)</h2>
      <ResponsiveContainer>
        <LineChart
          data={salesData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" label={{ value: 'Day of Month', position: 'insideBottomRight', offset: -10 }} />
          <YAxis label={{ value: 'Sales (Units)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {Object.keys(colors).map((region) => (
            <Line
              key={region}
              type="monotone"
              dataKey={region}
              stroke={colors[region]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PepsiSalesChartOverTime;