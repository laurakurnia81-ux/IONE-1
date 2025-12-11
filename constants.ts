import { ChartData, InventoryItem, KPIMetric } from './types';

export const MOCK_CHART_DATA: ChartData[] = [
    { name: 'Senin', masuk: 40, keluar: 24 },
    { name: 'Selasa', masuk: 30, keluar: 18 },
    { name: 'Rabu', masuk: 20, keluar: 50 },
    { name: 'Kamis', masuk: 27, keluar: 39 },
    { name: 'Jumat', masuk: 18, keluar: 48 },
    { name: 'Sabtu', masuk: 23, keluar: 38 },
    { name: 'Minggu', masuk: 34, keluar: 43 },
];

export const MOCK_INVENTORY: InventoryItem[] = [
    { id: '1', sku: 'SKU-001', name: 'Laptop Gaming X1', stock: 5, minStock: 10, category: 'Electronics', price: 15000000, status: 'Critical' },
    { id: '2', sku: 'SKU-002', name: 'Mouse Wireless Pro', stock: 120, minStock: 20, category: 'Accessories', price: 500000, status: 'Safe' },
    { id: '3', sku: 'SKU-003', name: 'Monitor 24 Inch', stock: 8, minStock: 15, category: 'Electronics', price: 2500000, status: 'Warning' },
    { id: '4', sku: 'SKU-004', name: 'Keyboard Mechanical', stock: 45, minStock: 10, category: 'Accessories', price: 1200000, status: 'Safe' },
    { id: '5', sku: 'SKU-005', name: 'HDMI Cable 2m', stock: 2, minStock: 50, category: 'Cables', price: 75000, status: 'Critical' },
];

export const KPI_DATA: KPIMetric[] = [
    { title: 'Total SKU Aktif', value: 456, trend: 'up', trendValue: '+12%' },
    { title: 'Stok Masuk Hari Ini', value: 120, unit: 'Unit', trend: 'up', trendValue: '+5%' },
    { title: 'Stok Keluar Hari Ini', value: 88, unit: 'Unit', trend: 'down', trendValue: '-2%' },
    { title: 'Nilai Persediaan (HPP)', value: 'Rp 1.2 M', trend: 'neutral', trendValue: '0%' },
];