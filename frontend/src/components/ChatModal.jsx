import React, { useState } from 'react';
import { X, Send, FileCode, Loader2, Terminal, ExternalLink } from 'lucide-react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

export default function ChatModal({ isOpen, onClose, projectId }) {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isAsking, setIsAsking] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsAsking(true);
     console.log(query);
    try {
      const res = await fetch('https://code-sage-be.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query ,projectId:projectId.id })
      });
      const data = await res.json();
      if (data.success) {
        setChatHistory([...chatHistory, { 
          question: query, 
          answer: data.answer, 
          sources: data.sources 
        }]);
        setQuery("");
      }
    } catch (err) {
        console.log(err);
      alert("Failed to get answer");
    } finally {
      setIsAsking(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-xl text-white"><Terminal size={20}/></div>
            <div>
              <h2 className="text-lg font-black italic uppercase tracking-tighter">{projectId.name}</h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-all text-slate-400 hover:text-black">
            <X size={24} />
          </button>
        </div>

        {/* Chat & Snippet Area */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left: Chat Flow */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 border-r border-slate-50">
            {chatHistory.map((chat, i) => (
              <div key={i} className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-black text-white px-5 py-3 rounded-2xl rounded-tr-none text-sm font-medium max-w-[80%]">
                    {chat.question}
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-slate-100 text-slate-800 px-5 py-4 rounded-2xl rounded-tl-none text-sm leading-relaxed max-w-[90%] border border-slate-200">
                    {chat.answer}
                  </div>
                </div>
              </div>
            ))}
            {isAsking && <div className="text-xs font-black italic text-slate-400 animate-pulse">AI IS THINKING...</div>}
          </div>

          {/* Right: Sources (The "Proof") */}
          <div className="w-full md:w-80 bg-slate-50/50 p-6 overflow-y-auto border-t md:border-t-0">
            <div className="space-y-3">
              {chatHistory[chatHistory.length - 1]?.sources?.map((source, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-emerald-500 transition-colors group">
                  <div className="flex items-center gap-2 mb-2 text-emerald-600 font-bold text-[11px]">
                    <FileCode size={14} /> {source.fileName}
                  </div>
                  <pre className="text-[10px] font-mono text-slate-500 bg-slate-50 p-2 rounded-md overflow-x-hidden">
                        {source.codeSnippet.substring(0, 100)}...
                  </pre>
                </div>
              ))}
              {chatHistory.length === 0 && <p className="text-[10px] italic text-slate-300">Ask a question to see code references here.</p>}
            </div>
          </div>
        </div>

        {/* Input Footer */}
        <div className="p-6 bg-white border-t">
          <div className="relative flex items-center max-w-3xl mx-auto">
            <input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Ask about logic, flow, or specific functions..."
              className="w-full bg-slate-100 border-2 border-transparent rounded-2xl px-6 py-4 text-sm focus:outline-none focus:bg-white focus:border-black transition-all pr-16"
            />
            <button 
              onClick={handleAsk}
              disabled={isAsking || !query.trim()}
              className="absolute right-2 p-3 bg-black text-white rounded-xl hover:scale-105 active:scale-95 disabled:bg-slate-200 transition-all"
            >
              {isAsking ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}