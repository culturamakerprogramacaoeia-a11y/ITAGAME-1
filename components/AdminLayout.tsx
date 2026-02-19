import React, { useState } from 'react';
import { AdminScreen } from '../types';
import Mascot from './Mascot';
import { Plus, ChevronDown, Bell, LogOut, LayoutIcon } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeScreen: AdminScreen;
  onNavigate: (screen: AdminScreen) => void;
  onLogout: () => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeScreen, onNavigate, onLogout }) => {
  const [showMissionDropdown, setShowMissionDropdown] = useState(false);

  // Menu de navegação admin com ícones EMOJI originais + Relatórios
  const menuItems = [
    { id: AdminScreen.OVERVIEW, label: 'Dashboard', icon: "📊", screen: AdminScreen.OVERVIEW },
    { id: AdminScreen.STUDENTS, label: 'Alunos', icon: "🎓", screen: AdminScreen.STUDENTS },
    { id: AdminScreen.MISSIONS, label: 'Missões', icon: "🎯", screen: AdminScreen.MISSIONS },
    { id: AdminScreen.REPORTS, label: 'Relatórios', icon: "📈", screen: AdminScreen.REPORTS },
    { id: AdminScreen.VALIDATION, label: 'Validação', icon: "✅", screen: AdminScreen.VALIDATION, badge: 3 },
    { id: AdminScreen.ECONOMY, label: 'Loja', icon: "💰", screen: AdminScreen.ECONOMY },
    { id: AdminScreen.SETTINGS, label: 'Ajustes', icon: "⚙️", screen: AdminScreen.SETTINGS },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col md:flex-row font-outfit selection:bg-violet-500/30">
      {/* Sidebar - O Robô está de volta aqui 🤖 */}
      <aside className="w-full md:w-72 bg-[#0a0f1d] border-r border-white/5 flex flex-col shrink-0 md:h-screen sticky top-0 shadow-2xl z-[70]">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-4xl animate-float">🤖</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black text-white tracking-tighter">ITA</span>
                <span className="text-2xl font-black text-[#22d3ee] tracking-tighter">GAME</span>
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Admin Panel</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.screen)}
              className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all group relative overflow-hidden ${activeScreen === item.id
                  ? 'bg-[#7c3aed] text-white shadow-xl shadow-violet-600/20'
                  : 'hover:bg-white/5 text-slate-400 hover:text-slate-200'
                }`}
            >
              <span className={`text-xl transition-transform duration-300 ${activeScreen === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                {item.icon}
              </span>
              <span className="flex-1 text-left font-bold text-sm tracking-tight">{item.label}</span>
              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${activeScreen === item.id ? 'bg-white text-[#7c3aed]' : 'bg-[#f43f5e] text-white'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 mt-auto border-t border-white/5 bg-[#0a0f1d]/50">
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl mb-4 border border-white/5">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center border border-white/5 overflow-hidden">
              <Mascot size="sm" animate={true} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-[11px] font-black truncate text-white uppercase tracking-wider">ITA ROBOT</p>
              <p className="text-[9px] text-slate-500 truncate font-semibold uppercase tracking-widest leading-none">Assistente</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full py-3.5 flex items-center justify-center gap-3 text-rose-500 hover:text-rose-400 transition-all font-black text-[10px] uppercase tracking-[0.2em] bg-rose-500/5 hover:bg-rose-500/10 rounded-2xl border border-rose-500/10"
          >
            <LogOut size={14} />
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#020617] relative">
        <header className="h-24 bg-[#0a0f1d]/60 backdrop-blur-2xl border-b border-white/5 px-10 flex items-center justify-between shrink-0 relative z-[110]">
          <h2 className="text-2xl font-black text-white font-fredoka uppercase tracking-tight italic">
            {menuItems.find(m => m.id === activeScreen)?.label || 'Relatórios'}
          </h2>

          <div className="flex items-center gap-6">
            <button className="p-3.5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all relative group">
              <Bell size={20} className="text-slate-400 group-hover:text-white" />
              <div className="absolute top-3.5 right-3.5 w-2 h-2 bg-[#f43f5e] rounded-full border-2 border-[#020617] animate-pulse"></div>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowMissionDropdown(!showMissionDropdown)}
                className="h-14 px-8 bg-[#7c3aed] hover:bg-[#6d28d9] rounded-2xl font-black text-xs text-white transition-all flex items-center gap-3 shadow-2xl shadow-violet-600/30 active:scale-95 group"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                <span className="uppercase tracking-[0.2em]">Nova Missão</span>
                <ChevronDown size={14} className={`opacity-40 transition-transform ${showMissionDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showMissionDropdown && (
                <>
                  <div className="fixed inset-0 z-[120]" onClick={() => setShowMissionDropdown(false)} />
                  <div className="absolute top-full right-0 mt-4 w-72 bg-[#0a0f1d] border border-white/10 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-[130] p-3 animate-in fade-in zoom-in duration-200">
                    <button
                      onClick={() => { onNavigate(AdminScreen.MISSIONS); setShowMissionDropdown(false); }}
                      className="w-full text-left p-5 hover:bg-white/5 flex items-center gap-5 transition-all rounded-[24px] group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-[#7c3aed]/10 group-hover:text-[#7c3aed] text-2xl transition-all">⌨️</div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-black text-white uppercase tracking-tight">Manual</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Criar do zero</span>
                      </div>
                    </button>
                    <button
                      onClick={() => { onNavigate(AdminScreen.MISSIONS); setShowMissionDropdown(false); }}
                      className="w-full text-left p-5 hover:bg-white/5 flex items-center gap-5 transition-all rounded-[24px] group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:text-cyan-400 text-2xl transition-all">✨</div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-black text-white uppercase tracking-tight">IA Generativa</span>
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Ideias rápidas</span>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-12 bg-[#020617] custom-scrollbar relative z-[100]">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

interface SidebarItemProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
  badge?: number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ active, onClick, icon, label, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all group relative overflow-hidden ${active
        ? 'bg-[#7c3aed] text-white shadow-xl shadow-violet-600/20'
        : 'hover:bg-white/5 text-slate-400 hover:text-slate-200'
      }`}
  >
    <span className={`text-xl transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
      {icon}
    </span>
    <span className="flex-1 text-left font-bold text-sm tracking-tight">{label}</span>
    {badge && (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${active ? 'bg-white text-[#7c3aed]' : 'bg-[#f43f5e] text-white'}`}>
        {badge}
      </span>
    )}
  </button>
);

export default AdminLayout;
