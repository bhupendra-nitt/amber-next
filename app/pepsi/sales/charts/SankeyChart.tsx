// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, SankeyNode, SankeyLink } from 'd3-sankey';

interface SankeyNodeExtended extends SankeyNode<SankeyNode, SankeyLink> {
  name: string;
}

interface SankeyLinkExtended extends SankeyLink<SankeyNode, SankeyLink> {
  product?: string;
}

const SankeyChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      const width = 1200;
      const height = 800;

      const svg = d3.select(svgRef.current)
        .attr('width', width)
        .attr('height', height);

      svg.selectAll("*").remove(); // Clear previous render

      const sankeyGenerator = sankey<SankeyNodeExtended, SankeyLinkExtended>()
        .nodeWidth(15)
        .nodePadding(10)
        .extent([[1, 1], [width - 1, height - 6]]);

      const { nodes, links } = sankeyGenerator(generateData());

      const link = svg.append("g")
        .selectAll(".link")
        .data(links)
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", sankeyLinkHorizontal())
        .attr("stroke-width", d => Math.max(1, d.width || 0))
        .attr("stroke", d => d3.schemeCategory10[nodes.indexOf(d.source as SankeyNodeExtended) % 10])
        .attr("fill", "none")
        .attr("opacity", 0.5);

      link.append("title")
        .text(d => `${d.source.name} → ${d.target.name}\n${d.product || 'Mixed'}\n${d.value} units`);

      const node = svg.append("g")
        .selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x0},${d.y0})`);

      node.append("rect")
        .attr("height", d => (d.y1 || 0) - (d.y0 || 0))
        .attr("width", d => (d.x1 || 0) - (d.x0 || 0))
        .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
        .attr("opacity", 0.8);

      node.append("text")
        .attr("x", d => ((d.x0 || 0) < width / 2 ? 6 + ((d.x1 || 0) - (d.x0 || 0)) : -6))
        .attr("y", d => ((d.y1 || 0) - (d.y0 || 0)) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => (d.x0 || 0) < width / 2 ? "start" : "end")
        .text(d => d.name)
        .attr("font-size", "10px")
        .attr("fill", "black");

      node.append("title")
        .text(d => `${d.name}\n${d.value} units`);
    }
  }, []);

  return <svg ref={svgRef}></svg>;
};

function generateData() {
  const numRetailers = 5;
  const numStoresPerRetailer = 12;
  const numProducts = 20;

  const nodes: SankeyNodeExtended[] = [
    { name: "FMCG" },
    ...Array(numRetailers).fill(0).map((_, i) => ({ name: `Retailer ${i + 1}` })),
    ...Array(numRetailers * numStoresPerRetailer).fill(0).map((_, i) => ({ name: `Store ${Math.floor(i / numStoresPerRetailer) + 1}-${(i % numStoresPerRetailer) + 1}` })),
    { name: "Sold" },
    { name: "In Stock" },
    { name: "Expired" },
    { name: "Distribution Center" }
  ];

  const links: SankeyLinkExtended[] = [];

  // FMCG to Retailers
  for (let i = 0; i < numProducts; i++) {
    for (let j = 0; j < numRetailers; j++) {
      links.push({
        source: 0,
        target: j + 1,
        value: Math.floor(Math.random() * 1000) + 100,
        product: `Product ${i + 1}`
      });
    }
  }

  // Retailers to Stores
  for (let i = 0; i < numRetailers; i++) {
    const retailerTotal = links.filter(l => l.target === i + 1).reduce((sum, l) => sum + l.value, 0);
    for (let j = 0; j < numStoresPerRetailer; j++) {
      const storeValue = Math.floor((Math.random() * 0.2 + 0.8) * retailerTotal / numStoresPerRetailer);
      links.push({
        source: i + 1,
        target: numRetailers + 1 + i * numStoresPerRetailer + j,
        value: storeValue,
        product: "Mixed"
      });
    }
  }

  // Stores to final states
  for (let i = numRetailers + 1; i < nodes.length - 4; i++) {
    const storeTotal = links.find(l => l.target === i)?.value || 0;
    const sold = Math.floor(storeTotal * (Math.random() * 0.3 + 0.5)); // 50-80% sold
    const inStock = Math.floor(storeTotal * (Math.random() * 0.2 + 0.1)); // 10-30% in stock
    const expired = Math.floor(storeTotal * (Math.random() * 0.1)); // 0-10% expired
    const inDistribution = storeTotal - sold - inStock - expired;

    links.push(
      { source: i, target: nodes.length - 4, value: sold, product: "Mixed" }, // Sold
      { source: i, target: nodes.length - 3, value: inStock, product: "Mixed" }, // In Stock
      { source: i, target: nodes.length - 2, value: expired, product: "Mixed" }, // Expired
      { source: i, target: nodes.length - 1, value: inDistribution, product: "Mixed" } // Distribution Center
    );
  }

  return { nodes, links };
}

export default SankeyChart;