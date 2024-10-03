'use client';
import InventoryGraph from "@/app/pepsi/inventory/charts/qty_on_hand_overtime";
import InventoryReport from "@/app/pepsi/inventory/charts/metric_charts";
import React from "react";
import InventoryProductReport from "@/app/pepsi/inventory/charts/inventory_by_product";
import InventoryHeatMap from "@/app/pepsi/inventory/charts/heatmap";
import TopInventoryByCityTable from "@/app/pepsi/inventory/charts/city_wise_inventory";
import InventoryByStoreTable from "@/app/pepsi/inventory/charts/inventory_by_store";

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

interface InventoryProductItem {
  sku: string;
  name: string;
  barcode: string;
  inHandQty: number;
  inHandRiyal: number;
  pointOfDistribution: number;
  avgOnHandQty: number;
  avgOnHandRiyal: number;
  avgWeeklySales: number;
}

interface InventoryProductReportProps {
  items: InventoryItem[];
}
const InventoryPage = () => {

  const generateRandomItemsForInventoryByProducts = (count: number): InventoryProductItem[] => {
    return Array.from({ length: count }, (_, index) => ({
      sku: `SKU${(index + 1).toString().padStart(5, '0')}`,
      name: `Product ${index + 1}`,
      barcode: Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0'),
      inHandQty: Math.floor(Math.random() * 1000),
      inHandRiyal: parseFloat((Math.random() * 10000).toFixed(2)),
      pointOfDistribution: Math.floor(Math.random() * 100),
      avgOnHandQty: Math.floor(Math.random() * 500),
      avgOnHandRiyal: parseFloat((Math.random() * 5000).toFixed(2)),
      avgWeeklySales: Math.floor(Math.random() * 100),
    }));
  };

  const generateRandomItems = (count: number): InventoryItem[] => {
    return Array.from({ length: count }, (_, index) => ({
      squNumber: `SQU${(index + 1).toString().padStart(5, '0')}`,
      qtyPerCarton: Math.floor(Math.random() * 20) + 1,
      pricePerUnit: parseFloat((Math.random() * 100).toFixed(2)),
      distributionCenterQty: Math.floor(Math.random() * 1000),
      inStoreQty: Math.floor(Math.random() * 500),
    }));
  };
  const items = generateRandomItems(10);
  const productItems = generateRandomItemsForInventoryByProducts(10);
  return (
    <div>
      <InventoryGraph squNumber="12345" retailer="Example Store" days={30}/>
      <InventoryReport retailer="Example Store" items={items}/>
      <br/>
      <div>Inventory Product</div>
      <InventoryProductReport items={productItems}/>
      <br/>
      <div>Inventory heatmap</div>
      <InventoryHeatMap/>
      <br/>
      <div>Inventory by City</div>
      <TopInventoryByCityTable/>
      <br/>
      <div>Inventory by Store</div>
      <InventoryByStoreTable/>
    </div>
  );
}

export default InventoryPage;