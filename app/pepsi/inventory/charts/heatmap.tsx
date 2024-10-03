import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMap from 'highcharts/modules/map';
import mapDataSaudi from '@/app/pepsi/sales/charts/map_data_saudi.json';

// Initialize the map module
highchartsMap(Highcharts);

interface InventoryData {
  'hc-key': string;
  value: number;
}

const generateRandomData = (): InventoryData[] => {
  const regions = [
    'sa-4293','sa-tb','sa-jz','sa-nj','sa-ri','sa-md','sa-ha','sa-qs','sa-hs','sa-jf','sa-sh','sa-ba','sa-as','sa-mk'
  ];

  return regions.map(region => ({
    'hc-key': region,
    value: Math.floor(Math.random() * 1000)
  }));
};

const InventoryHeatMap: React.FC = () => {
  const data = generateRandomData();

  const options: Highcharts.Options = {
    chart: {
      map: mapDataSaudi
    },
    title: {
      text: 'Inventory Heat Map - Saudi Arabia'
    },
    subtitle: {
      text: 'Inventory levels across regions'
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
      name: 'Inventory',
      states: {
        hover: {
          color: '#BADA55'
        }
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}'
      }
    }] as Highcharts.SeriesOptionsType[]
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

export default InventoryHeatMap;