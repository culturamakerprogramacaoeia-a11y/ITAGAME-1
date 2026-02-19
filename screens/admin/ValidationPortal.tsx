import React from 'react';
import Card from '../../components/Card';
import { Submission } from '../../types';

interface ValidationPortalProps {
  submissions: Submission[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const ValidationPortal: React.FC<ValidationPortalProps> = ({ submissions, onApprove, onReject }) => {
  const pending = submissions.filter(s => s.status === 'pending');
  const history = submissions.filter(s => s.status !== 'pending');

  return (
    <div className="space-y-10 pb-20">
      {/* Metrics Bar */}
      <div className="flex gap-4 p-6 bg-slate-900/50 rounded-[32px] border border-white/5 backdrop-blur-sm overflow-hidden relative">
        <div className="relative z-10 flex-1 border-r border-white/5 pr-6">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Aguardando Revisão</p>
          <h3 className="text-3xl font-black text-white">{pending.length}</h3>
        </div>
        <div className="relative z-10 flex-1 px-6">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Aprovação (Hoje)</p>
          <h3 className="text-3xl font-black text-emerald-500">94%</h3>
        </div>
        <div className="relative z-10 flex-1 pl-6">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Média de Resposta</p>
          <h3 className="text-3xl font-black text-violet-400">12<span className="text-sm font-bold opacity-60 ml-1">min</span></h3>
        </div>
        <div className="absolute top-[-50%] right-[-5%] w-64 h-64 bg-violet-600/10 blur-[80px] rounded-full pointer-events-none"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Queue Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Fila de Validação</h2>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Recentes</span>
          </div>

          <div className="space-y-4">
            {pending.map(sub => (
              <div key={sub.id} className="group bg-slate-900 border border-white/5 rounded-[40px] p-8 hover:border-violet-500/30 transition-all shadow-2xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Evidence Preview Mock */}
                  <div className="w-full md:w-32 h-32 bg-slate-950 rounded-3xl flex items-center justify-center border border-white/5 shadow-inner relative overflow-hidden group-hover:scale-105 transition-transform">
                    {sub.evidenceType === 'image' ? '🖼️' : sub.evidenceType === 'video' ? '🎬' : '📄'}
                    <div className="absolute inset-0 bg-violet-600/5 group-hover:bg-transparent transition-colors"></div>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Estudante</span>
                        <span className="text-[8px] text-slate-600 font-bold">•</span>
                        <span className="text-[8px] text-slate-600 font-bold uppercase tracking-widest">{sub.timestamp}</span>
                      </div>
                      <h4 className="text-lg font-black text-white uppercase tracking-tight leading-tight">{sub.studentName}</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Missão: <span className="text-slate-300">{sub.missionTitle}</span></p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => onApprove(sub.id)}
                        className="flex-1 py-4 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/10 active:scale-95 border border-emerald-500/20"
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => onReject(sub.id)}
                        className="flex-1 py-4 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border border-rose-500/20"
                      >
                        Recusar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {pending.length === 0 && (
              <div className="p-20 text-center bg-slate-900/30 rounded-[40px] border border-dashed border-white/5">
                <p className="text-slate-500 font-black uppercase text-xs tracking-[0.3em]">Tudo limpo! Nenhuma pendência.</p>
              </div>
            )}
          </div>
        </section>

        {/* History Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black text-white uppercase tracking-tighter italic">Histórico</h2>
            <button className="text-[10px] font-black text-violet-400 uppercase tracking-widest hover:text-white transition-colors">Limpar Logs</button>
          </div>

          <div className="bg-slate-900/50 rounded-[40px] border border-white/5 overflow-hidden">
            <div className="divide-y divide-white/5">
              {history.map(item => (
                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm ${item.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-500'}`}>
                      {item.status === 'approved' ? '✓' : '✕'}
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-white uppercase tracking-tight">{item.studentName}</p>
                      <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">{item.missionTitle}</p>
                    </div>
                  </div>
                  <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md border ${item.status === 'approved' ? 'border-emerald-500/20 text-emerald-500' : 'border-rose-500/20 text-rose-500'}`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
              ))}
              {history.length === 0 && (
                <p className="p-10 text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">Nenhuma atividade registrada</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ValidationPortal;
