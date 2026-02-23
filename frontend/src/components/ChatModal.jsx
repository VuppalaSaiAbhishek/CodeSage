import React, { useState } from 'react';
import { X, Send, FileCode, Loader2, Terminal } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatModal({ isOpen, onClose, projectId }) {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isAsking, setIsAsking] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;

    setIsAsking(true);

    try {
      const res = await fetch('https://codesage-0bk7.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query, projectId: projectId.id })
      });

      const data = await res.json();

      if (data.success) {
        setChatHistory(prev => [
          ...prev,
          {
            question: query,
            answer: data.answer,
            sources: data.sources
          }
        ]);
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
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-5xl h-[85vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-200">

        {/* HEADER */}
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-xl text-white">
              <Terminal size={20} />
            </div>
            <h2 className="text-lg font-black uppercase">{projectId.name}</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-black"
          >
            <X size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 flex overflow-hidden">

          {/* CHAT AREA */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 border-r">

            {chatHistory.map((chat, i) => (
              <div key={i} className="space-y-4">

                {/* USER QUESTION */}
                <div className="flex justify-end">
                  <div className="bg-black text-white px-5 py-3 rounded-2xl max-w-[80%] text-sm">
                    {chat.question}
                  </div>
                </div>

                {/* AI ANSWER */}
                <div className="flex justify-start">
                  <div className="bg-slate-100 px-5 py-4 rounded-2xl max-w-[90%] text-sm border">

                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code({ inline, children }) {
                          return inline ? (
                            <code className="bg-slate-200 px-1 rounded">
                              {children}
                            </code>
                          ) : (
                            <pre className="bg-black text-green-400 p-3 rounded-lg overflow-x-auto">
                              <code>{children}</code>
                            </pre>
                          );
                        },
                        a({ href, children }) {
                          return (
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 underline"
                            >
                              {children}
                            </a>
                          );
                        }
                      }}
                    >
                      {chat.answer}
                    </ReactMarkdown>

                  </div>
                </div>

              </div>
            ))}

            {isAsking && (
              <div className="text-xs font-bold text-slate-400 animate-pulse">
                AI IS THINKING...
              </div>
            )}
          </div>

          {/* SOURCES PANEL */}
          <div className="w-80 bg-slate-50 p-6 overflow-y-auto">

            {chatHistory[chatHistory.length - 1]?.sources?.map((source, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border shadow-sm mb-3"
              >
                <div className="flex items-center gap-2 mb-2 text-emerald-600 font-bold text-xs">
                  <FileCode size={14} />
                  {source.fileName}
                </div>

                <pre className="text-xs font-mono bg-slate-100 p-2 rounded overflow-x-auto">
                  {source.codeSnippet.substring(0, 120)}...
                </pre>
              </div>
            ))}

            {chatHistory.length === 0 && (
              <p className="text-xs italic text-slate-400">
                Ask a question to see code references.
              </p>
            )}

          </div>
        </div>

        {/* INPUT */}
        <div className="p-6 border-t">
          <div className="relative max-w-3xl mx-auto">

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Ask about logic, flow, or functions..."
              className="w-full bg-slate-100 rounded-2xl px-6 py-4 text-sm pr-16 focus:outline-none focus:bg-white border"
            />

            <button
              onClick={handleAsk}
              disabled={isAsking || !query.trim()}
              className="absolute right-2 top-2 p-3 bg-black text-white rounded-xl disabled:bg-slate-300"
            >
              {isAsking ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Send size={20} />
              )}
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}