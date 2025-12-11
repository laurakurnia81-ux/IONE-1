export interface KPIMetric {
    title: string;
    value: string | number;
    unit?: string;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
}

export interface ChartData {
    name: string;
    masuk: number;
    keluar: number;
}

export interface InventoryItem {
    id: string;
    sku: string;
    name: string;
    stock: number;
    minStock: number;
    category: string;
    price: number;
    status: 'Safe' | 'Warning' | 'Critical';
}

export enum ViewState {
    DASHBOARD = 'Dashboard',
    DATA_MASTER = 'Data Master',
    TRANSAKSI = 'Transaksi',
    LAPORAN = 'Laporan Persediaan',
    PENGATURAN = 'Pengaturan Akun'
}