import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, Box, DollarSign, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { KPI_DATA, MOCK_CHART_DATA, MOCK_INVENTORY } from '../constants';
import { generateInventoryReport } from '../services/geminiService';

const Dashboard: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string>('');
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    const [aiReport, setAiReport] = useState<string | null>(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleGenerateAIReport = async () => {
        setIsGeneratingReport(true);
        const report = await generateInventoryReport(MOCK_INVENTORY, MOCK_CHART_DATA);
        setAiReport(report);
        setIsGeneratingReport(false);
    };

    const criticalItems = MOCK_INVENTORY.filter(i => i.status === 'Critical' || i.status === 'Warning');

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Dashboard Analisis Stok</h2>
                    <p className="text-slate-500 text-sm mt-1">Overview performa gudang harian</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 text-slate-600 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    {currentTime}
                </div>
            </div>

            {/* Alert Bar */}
            {criticalItems.length > 0 && (
                <div className="bg-amber-500 text-white p-4 rounded-lg shadow-md mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 animate-in slide-in-from-top-2 duration-500">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                            <AlertTriangle size={24} />
                        </div>
                        <div>
                            <span className="font-bold text-lg">PERINGATAN STOK MINIMUM</span>
                            <p className="text-amber-100 text-sm">{criticalItems.length} item membutuhkan perhatian segera (Stock &lt; Min. Limit).</p>
                        </div>
                    </div>
                    <button className="bg-white text-amber-600 px-6 py-2 rounded-md font-bold hover:bg-amber-50 transition-colors shadow-sm text-sm whitespace-nowrap">
                        Lihat Detail
                    </button>
                </div>
            )}

            {/* KPI Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {KPI_DATA.map((kpi, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-slate-500 text-sm font-semibold uppercase tracking-wide">{kpi.title}</h4>
                            {index === 0 && <Box size={20} className="text-blue-500" />}
                            {index === 1 && <TrendingUp size={20} className="text-green-500" />}
                            {index === 2 && <TrendingDown size={20} className="text-orange-500" />}
                            {index === 3 && <DollarSign size={20} className="text-purple-500" />}
                        </div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-slate-800">{kpi.value}</span>
                            {kpi.unit && <span className="text-slate-500 text-sm font-medium">{kpi.unit}</span>}
                        </div>
                        <div className={`text-xs font-medium mt-2 flex items-center gap-1 ${
                            kpi.trend === 'up' ? 'text-green-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-slate-400'
                        }`}>
                            {kpi.trend === 'up' ? '▲' : kpi.trend === 'down' ? '▼' : '—'} 
                            {kpi.trendValue} dari minggu lalu
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm min-h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-800">Tren Mutasi Persediaan Mingguan</h3>
                        <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-md px-3 py-1 outline-none focus:ring-2 focus:ring-blue-500">
                            <option>7 Hari Terakhir</option>
                            <option>Bulan Ini</option>
                        </select>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={MOCK_CHART_DATA}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                                <Tooltip 
                                    cursor={{fill: '#f1f5f9'}}
                                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                                />
                                <Legend wrapperStyle={{paddingTop: '20px'}} />
                                <Bar dataKey="masuk" name="Stok Masuk" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="keluar" name="Stok Keluar" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* AI Assistant Section */}
                <div className="lg:col-span-1 flex flex-col gap-6">
                     <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="text-yellow-300" />
                            <h3 className="text-lg font-bold">IONI AI Assistant</h3>
                        </div>
                        <p className="text-indigo-100 text-sm mb-6">
                            Gunakan kecerdasan buatan untuk menganalisis anomali stok dan mendapatkan rekomendasi restock otomatis.
                        </p>
                        <button 
                            onClick={handleGenerateAIReport}
                            disabled={isGeneratingReport}
                            className="w-full bg-white text-indigo-700 font-bold py-3 rounded-lg shadow-md hover:bg-indigo-50 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isGeneratingReport ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Menganalisis Data...
                                </>
                            ) : (
                                "Analisis Stok Sekarang"
                            )}
                        </button>
                    </div>

                    {/* AI Report Result */}
                    {aiReport && (
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-grow overflow-y-auto max-h-[400px]">
                            <h4 className="font-bold text-slate-800 mb-3 border-b pb-2">Laporan Analisis Cerdas</h4>
                            <div className="prose prose-sm prose-slate max-w-none">
                                <ReactMarkdown>{aiReport}</ReactMarkdown>
                            </div>
                        </div>
                    )}

                    {!aiReport && (
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex-grow flex items-center justify-center text-center">
                            <p className="text-slate-400 text-sm italic">
                                Belum ada laporan. Klik tombol analisis untuk melihat insight AI.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;