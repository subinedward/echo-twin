import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutGrid, 
  Database, 
  Mic, 
  FileText, 
  Settings, 
  LogOut, 
  Plus, 
  MoreHorizontal, 
  Trash2, 
  RefreshCw,
  Activity,
  User
} from 'lucide-react';

export const DashboardScreen: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-[#E5E5E5] flex font-mono selection:bg-white selection:text-black">
      
      {/* PART 1: SIDEBAR */}
      <Sidebar />

      {/* PART 2: MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto h-screen scrollbar-hide">
        <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-min">
          
          {/* Quadrant 1: The Pulse (Stats) */}
          <div className="col-span-1 lg:col-span-3 border-b border-white/10 p-8 relative overflow-hidden group">
             {/* Background Sparkline */}
             <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" preserveAspectRatio="none">
                   <path d="M0,100 Q100,50 200,80 T400,20 T600,60 T800,10 T1000,50 L1000,120 L0,120 Z" fill="url(#grad)" />
                   <defs>
                      <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: 'white', stopOpacity: 0 }} />
                      </linearGradient>
                   </defs>
                </svg>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <StatItem label="TOTAL INTERACTIONS" value="482" />
                <StatItem label="FILTER RATE" value="89%" color="text-cyan-400" />
                <StatItem label="OPPORTUNITIES UNLOCKED" value="12" color="text-white" />
             </div>
          </div>

          {/* Quadrant 2: Knowledge Base */}
          <div className="col-span-1 lg:col-span-2 border-r border-b border-white/10 min-h-[400px] flex flex-col">
             <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-serif text-xl text-white">Context Sources</h3>
                <button className="flex items-center gap-2 px-4 py-2 border border-white/20 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                   <Plus size={14} /> Add Source
                </button>
             </div>
             <div className="flex-1">
                <SourceRow name="Resume_2024.pdf" type="PDF" time="2h ago" status="active" />
                <SourceRow name="github.com/alex/v1" type="URL" time="1d ago" status="active" />
                <SourceRow name="Raw_Thoughts.txt" type="TXT" time="Just now" status="indexing" />
             </div>
          </div>

          {/* Quadrant 3: Quick Settings */}
          <div className="col-span-1 lg:col-span-1 border-b border-white/10 p-6 flex flex-col gap-8">
             <h3 className="font-serif text-xl text-white pb-4 border-b border-white/10">Twin Behavior</h3>
             
             <div className="space-y-6">
                <SettingToggle label="Availability Mode" options={['DEEP WORK', 'OPEN']} activeIndex={0} />
                <SettingToggle label="Gatekeeping Level" options={['HIGH', 'LOW']} activeIndex={0} />
                <ToneSlider />
             </div>
          </div>

          {/* Quadrant 4: System Prompt */}
          <div className="col-span-1 lg:col-span-3 border-b border-white/10 bg-zinc-900/10 min-h-[300px] flex flex-col">
             <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-serif text-xl text-white">Core Directive (The Brain)</h3>
                <div className="text-[10px] text-zinc-500 uppercase tracking-widest">v1.2_LATEST</div>
             </div>
             <div className="flex-1 relative font-mono text-sm p-6 flex gap-4">
                {/* Line Numbers */}
                <div className="text-zinc-600 select-none text-right space-y-1">
                   {[1,2,3,4,5,6].map(n => <div key={n}>{n}</div>)}
                </div>
                {/* Editor */}
                <textarea 
                  className="flex-1 bg-transparent border-none outline-none resize-none text-zinc-300 leading-relaxed h-full font-mono"
                  defaultValue={`You are Alex's Twin. 
You are skeptical of crypto projects but love AI infrastructure. 
You prefer email over Zoom. 
Your hourly rate is $150 minimum.
Always ask for specific agendas before booking.`}
                />
                
                {/* Floating Save Button */}
                <button className="absolute bottom-6 right-6 px-6 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform">
                   [ SAVE CHANGES ]
                </button>
             </div>
          </div>

        </div>
      </main>

    </div>
  );
};

// --- Subcomponents ---

const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-white/10 h-screen flex flex-col hidden md:flex sticky top-0">
       <div className="p-8 border-b border-white/10">
          <div className="font-mono font-bold tracking-widest text-white mb-6">ECHO_SYSTEMS</div>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center border border-white/10">
                <User size={16} />
             </div>
             <div>
                <div className="font-serif text-sm">Alex Chen</div>
                <div className="text-[10px] text-zinc-500 uppercase">PRO PLAN</div>
             </div>
          </div>
       </div>

       <nav className="flex-1 py-8 space-y-1">
          <NavItem label="OVERVIEW" active icon={<LayoutGrid size={16} />} />
          <NavItem label="KNOWLEDGE_BASE" icon={<Database size={16} />} />
          <NavItem label="VOICE_SETTINGS" icon={<Mic size={16} />} />
          <NavItem label="LOGS" icon={<Activity size={16} />} />
       </nav>

       <div className="p-8 border-t border-white/10">
          <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-emerald-500 mb-4">
             <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             SYSTEM: ONLINE
          </div>
          <button className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest">
             <LogOut size={14} /> Disconnect
          </button>
       </div>
    </aside>
  );
};

const NavItem = ({ label, active, icon }: { label: string, active?: boolean, icon: any }) => (
  <div className={`
    group flex items-center gap-4 px-8 py-3 cursor-pointer transition-colors
    ${active ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
  `}>
     {active && <div className="w-1.5 h-4 bg-white" />}
     <div className={`flex items-center gap-3 text-xs tracking-widest uppercase ${!active && 'pl-5.5'}`}>
        {icon} {label}
     </div>
  </div>
);

const StatItem = ({ label, value, color = "text-white" }: { label: string, value: string, color?: string }) => (
  <div>
     <div className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase mb-2">{label}</div>
     <div className={`font-serif text-4xl md:text-5xl ${color}`}>{value}</div>
  </div>
);

const SourceRow = ({ name, type, time, status }: { name: string, type: string, time: string, status: 'active' | 'indexing' }) => (
  <div className="group flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-default">
     <div className="flex items-center gap-4">
        <div className="w-8 h-8 flex items-center justify-center border border-white/10 text-zinc-500">
           {type === 'PDF' && <FileText size={14} />}
           {type === 'URL' && <Database size={14} />}
           {type === 'TXT' && <FileText size={14} />}
        </div>
        <div>
           <div className="font-mono text-xs text-white mb-1">{name}</div>
           <div className="flex items-center gap-2 text-[10px] text-zinc-500 uppercase">
              <span>{type}</span>
              <span>•</span>
              <span>{time}</span>
           </div>
        </div>
     </div>
     
     <div className="flex items-center gap-4">
        <div className={`text-[10px] tracking-widest uppercase ${status === 'active' ? 'text-emerald-500' : 'text-yellow-500 animate-pulse'}`}>
           [{status === 'active' ? ' ACTIVE ' : ' INDEXING '}]
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
           <button className="p-2 hover:bg-white hover:text-black transition-colors border border-transparent hover:border-white">
              <RefreshCw size={12} />
           </button>
           <button className="p-2 hover:bg-red-500 hover:text-white transition-colors border border-transparent hover:border-red-500">
              <Trash2 size={12} />
           </button>
        </div>
     </div>
  </div>
);

const SettingToggle = ({ label, options, activeIndex }: { label: string, options: string[], activeIndex: number }) => (
  <div>
     <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3">{label}</div>
     <div className="flex items-center gap-4 font-mono text-xs cursor-pointer">
        {options.map((opt, i) => (
           <div key={opt} className={`transition-colors ${i === activeIndex ? 'text-white' : 'text-zinc-600'}`}>
              [ <span className={i === activeIndex ? 'text-white' : ''}>{opt}</span> ]
           </div>
        ))}
     </div>
  </div>
);

const ToneSlider = () => (
  <div>
     <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mb-3">Tone Calibration</div>
     <div className="relative h-1 bg-zinc-800 w-full mt-2">
        <div className="absolute left-0 top-0 h-full w-3/4 bg-white" />
        <div className="absolute left-3/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-white hover:scale-125 transition-transform cursor-pointer" />
     </div>
     <div className="flex justify-between mt-2 font-mono text-[10px] text-zinc-500 uppercase">
        <span>Casual</span>
        <span>Professional</span>
     </div>
  </div>
);
