import React from 'react';
import { LayoutDashboard, Database, ArrowRightLeft, FileText, Settings, ShieldCheck } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
    currentView: ViewState;
    onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
    
    const menuItems = [
        { id: ViewState.DASHBOARD, icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { id: ViewState.DATA_MASTER, icon: <Database size={20} />, label: 'Data Master' },
        { id: ViewState.TRANSAKSI, icon: <ArrowRightLeft size={20} />, label: 'Transaksi' },
        { id: ViewState.LAPORAN, icon: <FileText size={20} />, label: 'Laporan Persediaan' },
        { id: ViewState.PENGATURAN, icon: <Settings size={20} />, label: 'Pengaturan Akun' },
    ];

    return (
        <div className="w-64 bg-slate-800 text-white h-screen flex flex-col shadow-xl fixed left-0 top-0 overflow-y-auto z-10">
            <div className="p-6 border-b border-slate-600 text-center">
                <div className="flex justify-center mb-3">
                    <ShieldCheck size={40} className="text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold tracking-wider">APLIKASI IONI</h3>
                <small className="text-slate-400 block mt-1">Admin / Gudang Utama</small>
            </div>
            
            <div className="flex-1 py-6 px-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-3">Menu Utama</h4>
                <div className="space-y-1">
                    {menuItems.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onChangeView(item.id)}
                            className={`flex items-center gap-3 px-3 py-3 rounded-md cursor-pointer transition-colors duration-200 ${
                                currentView === item.id 
                                ? 'bg-slate-700 text-white border-l-4 border-emerald-500' 
                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                            }`}
                        >
                            {item.icon}
                            <span className="font-medium text-sm">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6 border-t border-slate-600 text-xs text-slate-400 text-center">
                <p>Sistem SIA Terintegrasi</p>
                <p className="mt-1">v2.0.1 (Beta)</p>
            </div>
        </div>
    );
};

export default Sidebar;