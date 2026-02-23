import React from 'react';
import { Upload, Activity, Code2,HistoryIcon } from 'lucide-react';

const Navbar = ({ activeView, setView }) => {
  const navItems = [
    { id: 'home', label: 'HOME', icon: <Upload size={16} /> },
    { id: 'history', label: 'HISTORY', icon: <HistoryIcon size={16} /> },
    { id: 'status', label: 'SYSTEM', icon: <Activity size={16} /> },
  ];

  return (
    <nav className="h-20 bg-white border-b border-slate-100 sticky top-0 z-50 px-4">
      <div className="container mx-auto h-full flex items-center justify-between gap-2">
        
        {/* Left: Logo - Shrinks text on mobile */}
        <div 
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0" 
          onClick={() => setView('home')}
        >
          <div className="bg-black p-1.5 sm:p-2 rounded-xl shadow-lg transition-transform group-hover:scale-105">
            <Code2 size={20} className="text-white sm:w-6 sm:h-6" />
          </div>
          <span className="font-black text-lg sm:text-2xl tracking-tighter italic text-black uppercase">
            Code Sage
          </span>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-full border border-slate-200 shadow-sm">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setView(item.id)}
                  className={`
                    cursor-pointer flex items-center justify-center gap-2 transition-all duration-200 font-bold tracking-widest whitespace-nowrap
                    /* Mobile: Small circle buttons */
                    p-2.5 rounded-full text-[10px] 
                    /* Tablet/Desktop: Wide pill buttons */
                    sm:px-6 sm:py-2.5 sm:text-xs
                    ${isActive 
                      ? 'bg-black text-white shadow-md' 
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                    }
                  `}
                >
                  <span className="shrink-0">{item.icon}</span>
                  
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;