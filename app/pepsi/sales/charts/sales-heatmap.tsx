import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import mapDataSaudi from './map_data_saudi.json';

// Initialize the map module
highchartsMap(Highcharts);

interface RegionData {
  'hc-key': string;
  value: number;
}

const SaudiArabiaHeatmap: React.FC = () => {
  // Simulated data for the four regions
  const data: RegionData[] = [
    { 'hc-key': 'sa-ea', value: Math.random() * 1000000 + 500000 }, // Eastern Province
    { 'hc-key': 'sa-ri', value: Math.random() * 1000000 + 500000 }, // Riyadh (Central)
    { 'hc-key': 'sa-mk', value: Math.random() * 1000000 + 500000 }, // Makkah (West)
    { 'hc-key': 'sa-jf', value: Math.random() * 1000000 + 500000 }, // Rest of KSA (Northern Borders)
    {'hc-key': 'sa-sh', value: Math.random() * 1000000 + 500000 }, // Rest of KSA (Southern Borders)
    {'hc-key': 'sa-tb', value: Math.random() * 100000 + 500 }, // Rest of KSA (Al Bahah)
    {'hc-key': 'sa-jz', value: Math.random() * 1000000 + 500000 }, // Rest of KSA (Al Jawf)
    {'hc-key': 'sa-nj', value: Math.random() * 1000000 + 500000 }, // Rest of KSA (Asir)
    {'hc-key': 'sa-md', value: Math.random() * 1000000 + 500000 }, // Rest of KSA (Hail)
    {'hc-key': 'sa-as', value: Math.random() * 1000000 + 500000 }, // Rest of KSA (Jizan)
    {'hc-key': 'sa-hs', value: Math.random() * 1000000 + 500000 }, // Rest of KSA (Najran)
    {'hc-key': 'sa-14', value: Math.random() * 1000000 + 500000 }, // Rest of KSA (Tabuk)
  ];

  const options: Highcharts.Options = {
    chart: {
      map: mapDataSaudi as any
    },
    title: {
      text: 'Saudi Arabia Sales Heatmap'
    },
    subtitle: {
      text: 'Source: Example Sales Data'
    },
    mapNavigation: {
      enabled: true,
      buttonOptions: {
        verticalAlign: 'bottom'
      }
    },
    colorAxis: {
      min: 0,
      stops: [
        [0, '#EFEFFF'],
        [0.5, '#4444FF'],
        [1, '#000044']
      ]
    },
    series: [{
      data: data,
      name: 'Sales',
      states: {
        hover: {
          color: '#BADA55'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      },
      type: 'map'
    } as Highcharts.SeriesMapOptions]
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        constructorType={'mapChart'}
      />
    </div>
  );
};

export default SaudiArabiaHeatmap;