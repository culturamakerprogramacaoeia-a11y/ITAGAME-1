import React from 'react';
import { Screen, UserStats } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  stats: UserStats;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, stats, onNavigate, onLogout }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#020617] flex flex-col relative font-fredoka overflow-x-hidden selection:bg-cyan-500/30">
      {/* Top Persistent Gamified Bar */}
      <div className="sticky top-0 z-50 px-6 py-5 flex items-center justify-between bg-[#020617]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="flex items-center gap-3">
          {/* Coin Pill */}
          <div className="flex items-center gap-2 bg-[#1e1b4b] pl-2 pr-4 py-2 rounded-2xl border border-white/10 shadow-2xl">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-sm border border-amber-500/20">💰</div>
            <span className="text-sm font-black text-white tracking-tight">{stats.coins.toLocaleString()}</span>
          </div>

          {/* XP Pill */}
          <div className="flex items-center gap-2 bg-[#1e1b4b] pl-2 pr-4 py-2 rounded-2xl border border-white/10 shadow-2xl">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center text-sm border border-cyan-500/20">⚡</div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-black text-white tracking-tight">{stats.xp}</span>
              <span className="text-[10px] font-black text-cyan-400 mt-0.5 uppercase">XP</span>
            </div>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-11 h-11 flex items-center justify-center bg-white/5 hover:bg-rose-500/10 text-slate-500 hover:text-rose-500 rounded-2xl transition-all border border-white/5 active:scale-90"
          title="Sair"
        >
          <span className="text-xl">🚪</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto custom-scrollbar">
        {children}
      </main>

      {/* Bottom Navigation Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-24 bg-[#0a0f1d]/90 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around px-4 z-50 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <NavItem
          active={activeScreen === Screen.DASHBOARD}
          onClick={() => onNavigate(Screen.DASHBOARD)}
          icon="🏠"
          label="Início"
        />
        <NavItem
          active={activeScreen === Screen.DISCIPLINES}
          onClick={() => onNavigate(Screen.DISCIPLINES)}
          icon="🗺️"
          label="Trilhas"
        />
        <NavItem
          active={activeScreen === Screen.SHOP}
          onClick={() => onNavigate(Screen.SHOP)}
          icon="🛍️"
          label="Loja"
        />
        <NavItem
          active={activeScreen === Screen.RANKING}
          onClick={() => onNavigate(Screen.RANKING)}
          icon="🏆"
          label="Ranking"
        />
      </nav>
    </div>
  );
};

interface NavItemProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-1.5 transition-all duration-300 relative ${active ? 'text-[#22d3ee] -translate-y-2' : 'text-slate-500 opacity-60 hover:opacity-100 hover:text-white'}`}
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 ${active ? 'bg-[#22d3ee]/10 shadow-2xl shadow-cyan-500/20 border border-[#22d3ee]/20' : ''}`}>
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    {active && (
      <div className="absolute -bottom-2 w-1.5 h-1.5 bg-[#22d3ee] rounded-full shadow-[0_0_10px_#22d3ee] animate-pulse" />
    )}
  </button>
);

export default Layout;
