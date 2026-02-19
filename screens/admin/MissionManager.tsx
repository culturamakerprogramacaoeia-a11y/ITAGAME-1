import React, { useState } from 'react';
import Card from '../../components/Card';
import { Mission } from '../../types';

interface MissionManagerProps {
  missions: Mission[];
  onAdd: (mission: Mission) => void;
  onDelete: (id: string) => void;
}

const MissionManager: React.FC<MissionManagerProps> = ({ missions, onAdd, onDelete }) => {
  const [filter, setFilter] = useState<'all' | 'content' | 'test'>('all');

  const handleDelete = (id: string, title: string) => {
    if (confirm(`🚨 EXCLUIR MISSÃO: ${title.toUpperCase()}?\n\nIsso removerá a missão para todos os alunos.`)) {
      onDelete(id);
    }
  };

  const handleCreateMock = () => {
    const id = Math.random().toString(36).substr(2, 9);
    onAdd({
      id,
      title: `Nova Missão ${missions.length + 1}`,
      objective: 'Descrição automática da nova missão para fins de teste.',
      reward: 150,
      rewardType: 'xp',
      progress: 0,
      maxProgress: 1,
      completed: false,
      type: 'quiz'
    });
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex gap-2 bg-slate-900 p-1.5 rounded-2xl border border-white/5">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'all' ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/40' : 'text-slate-500 hover:text-white'}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter('content')}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'content' ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-900/40' : 'text-slate-500 hover:text-white'}`}
          >
            Conteúdo
          </button>
          <button
            onClick={() => setFilter('test')}
            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'test' ? 'bg-amber-500 text-white shadow-lg shadow-amber-900/40' : 'text-slate-500 hover:text-white'}`}
          >
            Avaliações
          </button>
        </div>

        <button
          onClick={handleCreateMock}
          className="px-10 py-4 bg-violet-600 hover:bg-violet-500 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-violet-900/30 flex items-center justify-center gap-3 group"
        >
          <span className="text-lg group-hover:rotate-90 transition-transform">✨</span>
          Gerar Missão IA
        </button>
      </div>

      {/* Missions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {missions.map(mission => (
          <div key={mission.id} className="group relative bg-slate-900 border border-white/5 rounded-[40px] p-8 hover:border-violet-500/30 transition-all shadow-2xl overflow-hidden active:scale-[0.98]">
            {/* Icon/Type Badge */}
            <div className="flex items-center justify-between mb-8">
              <div className="w-16 h-16 bg-slate-950 rounded-3xl flex items-center justify-center text-3xl shadow-inner border border-white/5 group-hover:scale-110 group-hover:bg-violet-600/10 transition-all duration-500">
                {mission.type === 'quiz' ? '📝' : mission.type === 'upload' ? '📸' : '⚡'}
              </div>
              <div className="flex flex-col items-end">
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${mission.rewardType === 'xp' ? 'text-violet-400' : 'text-amber-400'}`}>
                  +{mission.reward} {mission.rewardType.toUpperCase()}
                </span>
                <span className="text-[8px] font-bold text-slate-500 uppercase mt-1 tracking-widest">{mission.type}</span>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{mission.title}</h3>
              <p className="text-xs text-slate-500 font-bold leading-relaxed line-clamp-2">{mission.objective}</p>
            </div>

            {/* Progress Info */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <button onClick={() => alert('Abrindo editor de missão...')} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Editar</button>
                <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                <button onClick={() => handleDelete(mission.id, mission.title)} className="text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-rose-500 transition-colors">Excluir</button>
              </div>
              <div className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter shadow-lg ${mission.completed ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-950 text-slate-500 border border-white/5'}`}>
                {mission.completed ? 'Ativa' : 'Em Rascunho'}
              </div>
            </div>

            {/* Background glow decoration */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-violet-600/5 blur-[50px] rounded-full group-hover:bg-violet-600/10 transition-all"></div>
          </div>
        ))}

        {/* New Mission Card Placeholder */}
        <button
          onClick={handleCreateMock}
          className="border-2 border-dashed border-white/5 rounded-[40px] p-8 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] hover:border-violet-500/20 transition-all group min-h-[300px]"
        >
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-2xl text-slate-600 group-hover:scale-110 group-hover:text-violet-500 transition-all shadow-inner">
            +
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 group-hover:text-slate-400">Criar Nova Missão</p>
        </button>
      </div>
    </div>
  );
};

export default MissionManager;
