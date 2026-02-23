import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Cpu, Menu, X, Folder, Loader2, MessageCircle, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function SessionHistoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [history, setHistory] = useState([]); // This will now hold an array of projects
  const [activeProject, setActiveProject] = useState(null); // Rename to clarify it's a project
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Ensure this URL matches your new hierarchy route
        const res = await axios.get(`https://codesage-0bk7.onrender.com/users/history`);
        console.log(res.data);
        if (res.data.success) {
          setHistory(res.data.data || res.data.history || []);
        }
      } catch (err) {
        console.error("History fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-white min-screen">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* SIDEBAR: List of Projects */}
      <aside className={`
          fixed left-0 z-40 w-80 bg-white border-r border-slate-200 
          transform transition-transform duration-300 ease-in-out
          top-[64px] h-[calc(100vh-64px)] 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-50 bg-slate-50/50">
            <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Project Archive</h2>
            <p className="text-[10px] text-slate-500 mt-1">Last 10 active projects</p>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-3">
            {history.length === 0 ? (
               <div className="text-center py-10 text-slate-400 text-xs">No project history found</div>
            ) : (
              history.map((project, index) => (
                <button 
                  key={project.projectId || index} 
                  onClick={() => {setActiveProject(project); setIsSidebarOpen(false);}}
                  className={`cursor-pointer w-full flex flex-col items-start p-4 rounded-xl transition-all border ${
                    activeProject?.projectId === project.projectId 
                    ? 'bg-slate-900 border-slate-900 shadow-lg' 
                    : 'bg-white border-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Folder size={12} className={activeProject?.projectId === project.projectId ? 'text-blue-400' : 'text-slate-400'} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${activeProject?.projectId === project.projectId ? 'text-slate-300' : 'text-slate-500'}`}>
                      {project.name}
                    </span>
                  </div>
                  <span className={`text-xs text-left line-clamp-1 w-full ${activeProject?.projectId === project.projectId ? 'text-slate-400' : 'text-slate-500'}`}>
                    {project.messages?.[0]?.content || "No messages yet"}
                  </span>
                </button>
              ))
            )}
          </nav>
        </div>
      </aside>

      {/* MAIN VIEWER: Conversation within the Project */}
      <main className="flex-1 flex flex-col min-w-0 bg-white">
        <header className="flex items-center justify-between px-8 py-5 border-b border-slate-100 sticky top-0 z-10 bg-white">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 hover:bg-slate-100 rounded-lg">
              <Menu size={20} />
            </button>
            <h1 className="text-xs font-black text-slate-900 uppercase tracking-widest">
              {activeProject ? `Project: ${activeProject.name}` : 'Conversation Details'}
            </h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-4 md:px-8 py-10">
          <div className="max-w-3xl mx-auto">
            
            {!activeProject ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-slate-300">
                <MessageCircle size={32} className="opacity-20 mb-4" />
                <p className="text-sm font-medium">Select a project to view chat history</p>
              </div>
            ) : (
              <div className="space-y-10">
                {activeProject.messages?.map((msg, idx) => (
                  <div key={msg._id || idx} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      msg.role === 'user' ? 'bg-slate-200' : 'bg-blue-600 text-white'
                    }`}>
                      {msg.role === 'user' ? <User size={16} /> : <Cpu size={16} />}
                    </div>

                    {/* Content */}
                    <div className={`flex flex-col max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                          {msg.role === 'user' ? 'User' : 'Sage AI'}
                        </span>
                        
                        <div className={`px-5 py-3 rounded-2xl text-sm ${
                          msg.role === 'user' 
                          ? 'bg-slate-900 text-white rounded-tr-none' 
                          : 'bg-white text-slate-700 rounded-tl-none border border-slate-200 shadow-sm'
                        }`}>
                          {/* Use ReactMarkdown instead of just {msg.content} */}
                          <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : 'prose-slate'}`}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}