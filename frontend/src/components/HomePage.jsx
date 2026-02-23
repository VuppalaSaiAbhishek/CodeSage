import React, { useRef, useState } from 'react';
// 1. Added Loader2 to imports
import { Upload, Github, ChevronRight, ShieldCheck, History, Terminal, FileArchive, Check, Link2, Loader2 } from 'lucide-react';
import ChatModal from './ChatModal';

export default function HomePage() {
  const [activeProjectId, setActiveProjectId] = useState({ id: "", name: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [githubUrl, setGithubUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
  const isValidGithub = githubRegex.test(githubUrl.trim());

  const handleStartAnalysis = async (type) => {
    setIsProcessing(true);
    try {
      let response;
      if (type === 'zip') {
        const formData = new FormData();
        formData.append('file', selectedFile);
        response = await fetch('https://codesage-0bk7.onrender.com/upload', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('https://codesage-0bk7.onrender.com/github-upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ githubUrl: githubUrl }),
        });
      }

      if (response.ok) {
        const data = await response.json();
        const projectObj = {
          id: data.projectId,
          name: data.name || "Untitled Project"
        };
        setActiveProjectId(projectObj);
        setIsModalOpen(true);
      } else {
        const err = await response.json();
        alert(err.error || "Server error during analysis.");
      }
    } catch (error) {
      console.error("Connection failed:", error);
      alert("Could not connect to the Backend API.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith('.zip')) {
      setSelectedFile(file);
    } else if (file) {
      alert("Please select a valid ZIP file.");
      e.target.value = null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="pt-20 pb-12 px-4">
  <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
    
    {/* Main Heading Area */}
    <div className="text-left max-w-2xl">
      <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-black leading-[0.9]">
        TALK TO YOUR <br />
        <span className="italic underline decoration-slate-200 underline-offset-8">CODEBASE.</span>
      </h1>
    </div>

    {/* Small Side Notice Box */}
    <div className="max-w-xs p-3 text-amber-800 border-l-2 border-amber-400 rounded bg-amber-50 shadow-sm" role="alert">
        <p className="text-sm">
          <span className="font-bold uppercase mr-2">Notice:</span> 
          We are utilizing <span className="font-semibold text-amber-900">free LLM services and embeddings</span>. 
          Please be patient as processing might take some time. 
          For further technical details, view the 
          <a 
            href="https://github.com/VuppalaSaiAbhishek/CodeSage/blob/master/README.md" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ml-1 font-bold underline hover:text-amber-600 transition-colors"
          >
            README on GitHub.
          </a>
        </p>
    </div>

  </div>
</section>

      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            
            {/* ZIP Card Section */}
            <div className="flex flex-col gap-4">
              <div 
                onClick={() => !isProcessing && fileInputRef.current.click()}
                className={`flex-1 group cursor-pointer relative overflow-hidden rounded-3xl border-2 p-10 transition-all duration-300
                  ${selectedFile 
                    ? 'border-emerald-500 bg-emerald-50/30 shadow-lg shadow-emerald-100' 
                    : 'border-slate-200 bg-slate-50/50 hover:border-black hover:bg-white hover:shadow-2xl hover:shadow-slate-200'
                  }`}
              >
                <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept=".zip" />
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300
                  ${selectedFile ? 'bg-emerald-500 text-white' : 'bg-black text-white group-hover:scale-110'}`}>
                  {selectedFile ? <Check size={28} /> : <Upload size={28} />}
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">{selectedFile ? 'File Selected' : 'Local Project'}</h3>
                <p className="text-slate-500 text-sm mb-4">{selectedFile ? `Ready: ${selectedFile.name}` : 'Select a .zip folder of your source code.'}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black">
                   {selectedFile ? 'Change selection' : 'Browse Files'} <ChevronRight size={14} />
                </div>
              </div>

              <button 
                disabled={!selectedFile || isProcessing}
                onClick={() => handleStartAnalysis('zip')}
                className="cursor-pointer w-full py-5 rounded-2xl bg-black text-white font-black italic uppercase transition-all flex justify-center items-center gap-3 disabled:bg-slate-100 disabled:text-slate-300"
              >
                {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <FileArchive size={20} />}
                {isProcessing ? "Analyzing..." : "Analyze Zip"}
              </button>
            </div>

            {/* GitHub Card Section */}
            <div className="flex flex-col gap-4">
              <div className={`flex-1 rounded-3xl border-2 p-10 transition-all duration-300 flex flex-col justify-between
                ${isValidGithub ? 'border-emerald-500 bg-emerald-50/30 shadow-lg shadow-emerald-100' : 'border-slate-200 bg-white shadow-xl shadow-slate-100'}`}>
                <div>
                  <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300
                    ${isValidGithub ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-black'}`}>
                    {isValidGithub ? <Link2 size={28} /> : <Github size={28} />}
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-2">Public Repository</h3>
                  <p className="text-slate-500 text-sm mb-6">Enter a GitHub URL to start indexing.</p>
                </div>
                
                <div className="space-y-3">
                  <input 
                    type="text" 
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/user/repo"
                    className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-all
                      ${githubUrl && !isValidGithub ? 'border-red-400 ring-1 ring-red-100' : 'border-slate-200 focus:ring-2 focus:ring-black'}`}
                  />
                  {githubUrl && !isValidGithub && (
                    <p className="text-[10px] font-bold text-red-500 mt-1 uppercase tracking-wider">Invalid GitHub URL</p>
                  )}
                </div>
              </div>

              <button 
                // 2. Switched from onAnalyze to handleStartAnalysis
                disabled={!isValidGithub || isProcessing}
                onClick={() => handleStartAnalysis('github')}
                className={`cursor-pointer w-full py-5 rounded-2xl font-black italic text-lg tracking-tighter uppercase transition-all flex items-center justify-center gap-3
                  ${isValidGithub ? 'bg-black text-white shadow-xl hover:bg-slate-800 active:scale-95' : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'}`}
              >
                {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <Github size={20} />}
                {isProcessing ? "Fetching..." : "Fetch & Analyze"}
              </button>
            </div>
          </div>
        </div>
      </section>




      <ChatModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          window.location.reload();
        }} 
        projectId={activeProjectId} 
      />
    </div>
  );
}