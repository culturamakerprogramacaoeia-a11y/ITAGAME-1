import React from 'react';
import Card from '../components/Card';
import Mascot from '../components/Mascot';
import { MISSIONS, DISCIPLINES } from '../constants';
import { UserStats, Screen } from '../types';

interface DashboardProps {
  stats: UserStats;
  onNavigate: (screen: Screen) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, onNavigate }) => {
  return (
    <div className="p-6 space-y-8 pb-32 animate-in fade-in duration-500 font-fredoka">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em] leading-none">Bem-vindo, {stats.name}!</h2>
          <h1 className="text-4xl font-black uppercase tracking-tight text-white leading-none">Dashboard</h1>
        </div>
        <div className="w-16 h-16 rounded-[24px] bg-gradient-to-br from-[#7319ff] to-[#bd00ff] flex items-center justify-center text-3xl shadow-2xl shadow-violet-900/40 border-2 border-white/20 animate-float">
          {stats.avatar}
        </div>
      </div>

      {/* Main Progress Circle (Inspirado na Experiência Gamificada) */}
      <div className="flex flex-col items-center justify-center py-4 relative">
        <div className="relative w-56 h-56 flex items-center justify-center">
          {/* Progress SVG Ring */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="112" cy="112" r="100"
              stroke="currentColor" strokeWidth="12" fill="transparent"
              className="text-[#0a0f1d]"
            />
            <circle
              cx="112" cy="112" r="100"
              stroke="currentColor" strokeWidth="12" fill="transparent"
              strokeDasharray={2 * Math.PI * 100}
              strokeDashoffset={2 * Math.PI * 100 * (1 - (stats.xp / stats.maxXp))}
              strokeLinecap="round"
              className="text-[#22d3ee] drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-[#7c3aed] text-white font-black px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest shadow-lg shadow-violet-900/40 border border-white/20 mb-2">NÍVEL {stats.level}</div>
            <div className="w-32 h-32 bg-[#0a0f1d] rounded-full flex items-center justify-center p-2 border-2 border-white/5 shadow-inner">
              <div className="w-full h-full bg-[#1e1b4b] rounded-full overflow-hidden flex items-center justify-center">
                <Mascot size="md" animate={true} />
              </div>
            </div>
            <div className="mt-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{stats.xp} / 100 XP</div>
          </div>
        </div>
      </div>

      {/* Action Grid (Acessos Rápidos) */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onNavigate(Screen.DISCIPLINES)}
          className="bg-[#22d3ee]/10 border border-[#22d3ee]/20 p-6 rounded-[32px] flex flex-col items-center gap-3 group active:scale-95 transition-all shadow-xl shadow-cyan-900/5"
        >
          <span className="text-4xl group-hover:scale-110 transition-transform">🗺️</span>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Trilhas</span>
        </button>
        <button
          onClick={() => onNavigate(Screen.RANKING)}
          className="bg-[#7c3aed]/10 border border-[#7c3aed]/20 p-6 rounded-[32px] flex flex-col items-center gap-3 group active:scale-95 transition-all shadow-xl shadow-violet-900/5"
        >
          <span className="text-4xl group-hover:scale-110 transition-transform">🏆</span>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Ranking</span>
        </button>
        <button
          onClick={() => onNavigate(Screen.ACTIVITY)}
          className="bg-[#f43f5e]/10 border border-[#f43f5e]/20 p-6 rounded-[32px] flex flex-col items-center gap-3 group active:scale-95 transition-all shadow-xl shadow-rose-900/5"
        >
          <span className="text-4xl group-hover:scale-110 transition-transform">🎭</span>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Atitudes</span>
        </button>
        <button
          onClick={() => onNavigate(Screen.SHOP)}
          className="bg-[#fbbf24]/10 border border-[#fbbf24]/20 p-6 rounded-[32px] flex flex-col items-center gap-3 group active:scale-95 transition-all shadow-xl shadow-amber-900/5"
        >
          <span className="text-4xl group-hover:scale-110 transition-transform">🛍️</span>
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Loja ITA</span>
        </button>
      </div>

      {/* Section: Active Missions */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">Minhas Missões</h3>
          <button onClick={() => alert('Em breve!')} className="text-violet-400 text-[10px] font-black uppercase tracking-widest">Ver Todas</button>
        </div>
        <div className="space-y-4">
          {MISSIONS.slice(0, 3).map(mission => (
            <Card key={mission.id} className="p-6 flex items-center gap-5 group rounded-[32px] border-white/5 hover:border-[#7c3aed]/30 transition-all cursor-pointer">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/5 ${mission.completed ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 text-slate-400'}`}>
                {mission.completed ? '✓' : '⚡'}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-black text-[14px] uppercase tracking-tight text-white">{mission.title}</h4>
                <p className="text-[10px] text-slate-500 font-bold leading-tight truncate">{mission.objective}</p>
                <div className="mt-4 h-1.5 bg-slate-950 rounded-full overflow-hidden w-24 border border-white/5">
                  <div className="h-full bg-[#7c3aed]" style={{ width: `${(mission.progress / mission.maxProgress) * 100}%` }} />
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-black uppercase tracking-widest ${mission.rewardType === 'xp' ? 'text-violet-400' : 'text-amber-500'}`}>
                  +{mission.reward} {mission.rewardType.toUpperCase()}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
