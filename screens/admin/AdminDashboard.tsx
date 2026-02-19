import React from 'react';
import Card from '../../components/Card';
import { StudentRecord, Submission, Mission } from '../../types';

interface AdminDashboardProps {
  students: StudentRecord[];
  submissions: Submission[];
  missions: Mission[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ students, submissions, missions }) => {
  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const totalCoins = students.reduce((acc, s) => acc + s.coins, 0);

  return (
    <div className="space-y-10">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Alunos Ativos" value={students.length.toString()} trend="+12%" icon="👥" color="cyan" />
        <StatCard label="Missões Ativas" value={missions.length.toString()} trend="+5%" icon="🎯" color="violet" />
        <StatCard label="Validações" value={pendingCount.toString()} trend="Urgente" icon="✅" color="emerald" highlight={pendingCount > 0} />
        <StatCard label="Total Moedas" value={`${(totalCoins / 1000).toFixed(1)}k`} trend="-2%" icon="💰" color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Activity Feed Section */}
        <section className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Atividades em Tempo Real</h3>
            <button className="text-[10px] font-black text-violet-400 uppercase tracking-widest hover:text-white transition-colors">Ver Logs Completos</button>
          </div>

          <Card className="p-0 overflow-hidden border-white/5 bg-slate-900/40">
            <div className="divide-y divide-white/5">
              {[
                { id: '1', user: 'Ana Luiza', action: 'submeteu uma evidência para', item: 'Lógica Python', time: 'Há 5 min', color: 'bg-cyan-500', avatar: '👩' },
                { id: '2', user: 'Alexia M.', action: 'conquistou a badge', item: 'Mestre Maker', time: 'Há 12 min', color: 'bg-amber-500', avatar: '👧' },
                { id: '3', user: 'André Anuzzi', action: 'resgatou item na loja:', item: 'Skin Robô Dourado', time: 'Há 1 hora', color: 'bg-violet-500', avatar: '👦' },
                { id: '4', user: 'Sandra C.', action: 'subiu para o nível', item: 'Level 10 (Júnior)', time: 'Há 3 horas', color: 'bg-emerald-500', avatar: '👩' },
              ].map((row) => (
                <div key={row.id} className="p-6 flex items-center gap-6 hover:bg-white/[0.02] transition-all group cursor-pointer">
                  <div className={`w-12 h-12 rounded-2xl ${row.color} flex items-center justify-center text-xl shadow-lg shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all`}>
                    {row.avatar}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm truncate leading-tight">
                      <span className="font-black text-white uppercase tracking-tight">{row.user}</span>
                      <span className="text-slate-500 mx-2 text-[13px]">{row.action}</span>
                      <span className="font-black text-cyan-400 uppercase tracking-tight">{row.item}</span>
                    </p>
                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.2em] mt-1.5">{row.time}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                    <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-xs">👁️</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Top Performers / Ranking Quick View */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Líderes de XP</h3>
          </div>

          <Card className="p-8 bg-slate-900/40 border-white/5">
            <div className="space-y-8">
              {students.sort((a, b) => b.xp - a.xp).slice(0, 4).map((p, idx) => (
                <div key={p.id} className="flex items-center gap-5 group">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl border border-white/5 group-hover:border-violet-500/30 transition-all shadow-inner">
                      {p.avatar}
                    </div>
                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-slate-950 rounded-lg flex items-center justify-center text-[10px] font-black text-white border border-white/10 shadow-lg">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-black text-[15px] text-white uppercase tracking-tight truncate group-hover:text-cyan-400 transition-colors">{p.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[9px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-md font-black uppercase tracking-tighter">Lvl {p.level}</span>
                      <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none">{p.xp.toLocaleString()} XP</span>
                    </div>
                  </div>
                </div>
              ))}
              <button className="w-full mt-6 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black text-[10px] transition-all uppercase tracking-[0.3em] active:scale-95 shadow-xl border border-white/5">
                Ranking Completo
              </button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, trend, icon, color, highlight = false }: any) => {
  const colorMap: any = {
    cyan: 'bg-cyan-500/5 text-cyan-400 border-cyan-500/10',
    violet: 'bg-violet-500/5 text-violet-400 border-violet-500/10',
    emerald: 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10',
    amber: 'bg-amber-500/5 text-amber-400 border-amber-500/10',
  };

  return (
    <Card
      className={`p-8 border ${colorMap[color]} group hover:-translate-y-2 transition-all duration-500 shadow-2xl relative overflow-hidden cursor-pointer ${highlight ? 'ring-2 ring-emerald-500/50 animate-pulse' : ''}`}
    >
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center text-2xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${trend === 'Urgente' || trend.startsWith('-') ? 'bg-rose-500/20 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/20'}`}>
          {trend}
        </span>
      </div>
      <div className="relative z-10">
        <h3 className="text-4xl font-black mb-1 group-hover:text-white transition-colors tracking-tighter font-fredoka">{value}</h3>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-80 transition-all">{label}</p>
      </div>

      {/* Decorative background number */}
      <span className="absolute -bottom-4 -right-2 text-7xl font-black opacity-[0.02] group-hover:opacity-[0.05] transition-opacity select-none">{value}</span>
    </Card>
  );
};

export default AdminDashboard;
