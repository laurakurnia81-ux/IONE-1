import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { ViewState } from './types';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);

    const renderContent = () => {
        switch (currentView) {
            case ViewState.DASHBOARD:
                return <Dashboard />;
            default:
                return (
                    <div className="p-10 flex flex-col items-center justify-center h-full text-slate-400">
                        <div className="bg-slate-100 p-8 rounded-full mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-600 mb-2">{currentView}</h2>
                        <p>Modul ini sedang dalam tahap pengembangan.</p>
                        <button 
                            onClick={() => setCurrentView(ViewState.DASHBOARD)}
                            className="mt-6 px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-700 transition-colors"
                        >
                            Kembali ke Dashboard
                        </button>
                    </div>
                );
        }
    };

    return (
        <div className="flex bg-[#f8f9fa] min-h-screen">
            <Sidebar currentView={currentView} onChangeView={setCurrentView} />
            <main className="ml-64 flex-1 transition-all duration-300">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;