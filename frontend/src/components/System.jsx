import React, { useState, useEffect } from 'react';
import { RefreshCw, Database, Cpu, Globe, CheckCircle2, Terminal, AlertCircle } from 'lucide-react';

export default function SystemPage() {
  const [systemData, setSystemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liveLogs, setLiveLogs] = useState([
    { time: new Date().toLocaleTimeString(), msg: 'Initializing system monitor...', type: 'info' }
  ]);

  // 2. Function to fetch Health (DB Priority 1, AI Priority 2)
  const fetchSystemHealth = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://code-sage-be.onrender.com/users/system-status');
      const data = await response.json();
      setSystemData(data.systems);
      
      addLog(data.success ? 'System check completed: All healthy' : 'System check completed: Warnings found', data.success ? 'success' : 'error');
    } catch (error) {
      console.log(error);
      addLog('Failed to reach backend API', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Helper to add logs to the terminal
  const addLog = (msg, type = 'success') => {
    setLiveLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), msg, type }].slice(-10));
  };

  // 3. EFFECT: Load on Page Mount
  useEffect(() => {
    fetchSystemHealth();
    
    // Optional: Auto-refresh every 30 seconds
    const interval = setInterval(fetchSystemHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  // Map the backend data to your UI icons
  const metricsConfig = [
    { id: 'backend', label: 'Backend API', icon: <Globe size={18} /> },
    { id: 'vectorDb', label: 'Vector Database', icon: <Database size={18} /> },
    { id: 'aiEngine', label: 'AI Engine (OpenRouter)', icon: <Cpu size={18} /> },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${systemData?.vectorDb?.status === 'Healthy' ? 'bg-emerald-500' : 'bg-red-500'}`} />
              <span className={`text-[10px] font-bold tracking-widest uppercase ${systemData?.vectorDb?.status === 'Healthy' ? 'text-emerald-600' : 'text-red-600'}`}>
                {systemData?.vectorDb?.status === 'Healthy' ? 'All Systems Operational' : 'System Issues Detected'}
              </span>
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-black italic uppercase">System Health</h1>
            <p className="text-slate-500 text-sm mt-2">Real-time monitoring of indexing services and LLM latency.</p>
          </div>
          
          <button 
            onClick={fetchSystemHealth}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> REFRESH METRICS
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {metricsConfig.map((config) => {
            const data = systemData ? systemData[config.id] : null;
            const isHealthy = data?.status === 'Healthy';

            return (
              <div key={config.id} className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-slate-400">{config.icon}</div>
                  {isHealthy ? <CheckCircle2 size={16} className="text-emerald-500" /> : <AlertCircle size={16} className="text-red-500" />}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{config.label}</div>
                <div className="flex items-baseline justify-between">
                  <span className={`text-xl font-bold italic ${isHealthy ? 'text-black' : 'text-red-600'}`}>
                    {data ? data.status : 'Loading...'}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{data?.latency || 0}ms</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Logs / Console Section */}
        <div className="rounded-3xl border border-slate-200 bg-black overflow-hidden shadow-2xl">
          <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400 tracking-widest">SYSTEM_LOGS_V4.LOG</span>
            </div>
          </div>
          
          <div className="p-6 font-mono text-xs space-y-3 max-h-64 overflow-y-auto">
            {liveLogs.map((log, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-slate-600 shrink-0">[{log.time}]</span>
                <span className={log.type === 'success' ? 'text-emerald-400' : log.type === 'error' ? 'text-red-400' : 'text-slate-300'}>
                  <span className="text-slate-500">{'>'}</span> {log.msg}
                </span>
              </div>
            ))}
            <div className="text-emerald-400 animate-pulse">_</div>
          </div>
        </div>
      </div>
    </div>
  );
}