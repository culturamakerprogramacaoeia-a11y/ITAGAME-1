import React from 'react';
import { StudentRecord, Mission, Submission } from '../../types';
import {
    BarChart3,
    TrendingUp,
    PieChart,
    Target,
    Users,
    Zap,
    ChevronRight,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';

interface ReportsProps {
    students: StudentRecord[];
    missions: Mission[];
    submissions: Submission[];
}

const Reports: React.FC<ReportsProps> = ({ students, missions, submissions }) => {
    // Mock data for charts
    const totalXP = students.reduce((acc, s) => acc + s.xp, 0);
    const avgXP = Math.round(totalXP / students.length) || 0;
    const completionRate = Math.round((missions.filter(m => m.completed).length / missions.length) * 100) || 0;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white font-fredoka uppercase tracking-tight">Relatórios de Desempenho</h1>
                <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Análise profunda de engajamento, progresso pedagógico e métricas globais.</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ReportStatCard
                    label="Média de XP Aluno"
                    value={avgXP.toLocaleString()}
                    icon={<Zap size={20} className="text-[#22d3ee]" />}
                    trend="+15%"
                    trendUp={true}
                />
                <ReportStatCard
                    label="Taxa de Conclusão"
                    value={`${completionRate}%`}
                    icon={<Target size={20} className="text-[#7c3aed]" />}
                    trend="-2%"
                    trendUp={false}
                />
                <ReportStatCard
                    label="Engajamento Semanal"
                    value="92%"
                    icon={<TrendingUp size={20} className="text-emerald-400" />}
                    trend="+8%"
                    trendUp={true}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Engagement Chart (Mockup) */}
                <div className="bg-[#0a0f1d] border border-white/5 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-lg font-bold text-white font-fredoka flex items-center gap-3">
                            <BarChart3 className="text-[#7c3aed]" size={20} />
                            Fluxo de Atividade (7 dias)
                        </h2>
                        <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-slate-400 outline-none">
                            <option>Última Semana</option>
                            <option>Último Mês</option>
                        </select>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-3 px-4">
                        {[45, 60, 85, 40, 95, 70, 80].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-3 group/bar">
                                <div className="text-[10px] font-black text-slate-600 opacity-0 group-hover/bar:opacity-100 transition-opacity mb-1">{height}%</div>
                                <div
                                    className="w-full bg-gradient-to-t from-[#7c3aed]/20 to-[#7c3aed] rounded-t-xl transition-all duration-1000 ease-out delay-[100ms] group-hover:scale-y-110 origin-bottom shadow-[0_0_20px_rgba(124,58,237,0.2)]"
                                    style={{ height: `${height}%` }}
                                />
                                <span className="text-[10px] font-bold text-slate-600 uppercase mt-2">
                                    {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Categories Distribution */}
                <div className="bg-[#0a0f1d] border border-white/5 rounded-[32px] p-8 shadow-2xl overflow-hidden">
                    <h2 className="text-lg font-bold text-white font-fredoka flex items-center gap-3 mb-10">
                        <PieChart className="text-[#22d3ee]" size={20} />
                        Distribuição por Missão
                    </h2>

                    <div className="space-y-6">
                        <CategoryRow label="Lógica de Programação" percentage={65} color="bg-[#22d3ee]" />
                        <CategoryRow label="Empreendedorismo" percentage={45} color="bg-amber-500" />
                        <CategoryRow label="Design & UI" percentage={28} color="bg-[#7c3aed]" />
                        <CategoryRow label=" सॉफ्ट स्किल्स (Soft Skills)" percentage={12} color="bg-emerald-500" />
                    </div>
                </div>
            </div>

            {/* Recent Successes */}
            <div className="bg-[#0a0f1d] border border-white/5 rounded-[32px] p-8 shadow-2xl">
                <h2 className="text-lg font-bold text-white font-fredoka flex items-center gap-3 mb-8">
                    <Users className="text-violet-400" size={20} />
                    Evolução de Clã (Turmas)
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] border-b border-white/5">
                                <th className="pb-4">Turma/Clã</th>
                                <th className="pb-4">Engajamento</th>
                                <th className="pb-4">Média XP</th>
                                <th className="pb-4 text-right">Trend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {[
                                { name: '9º Ano A (Dragões)', eng: 94, xp: 4200, trend: '+12%' },
                                { name: '9º Ano B (Lobos)', eng: 78, xp: 3100, trend: '+5%' },
                                { name: '1º EM (Fênix)', eng: 88, xp: 3850, trend: '+2%' }
                            ].map((clan, i) => (
                                <tr key={i} className="group hover:bg-white/[0.01]">
                                    <td className="py-5 font-bold text-white text-sm">{clan.name}</td>
                                    <td className="py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-[#7c3aed]" style={{ width: `${clan.eng}%` }} />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400">{clan.eng}%</span>
                                        </div>
                                    </td>
                                    <td className="py-5 text-sm font-fredoka text-slate-300">{clan.xp.toLocaleString()} XP</td>
                                    <td className="py-5 text-right font-black text-[10px] text-emerald-400">{clan.trend}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const ReportStatCard = ({ label, value, icon, trend, trendUp }: any) => (
    <div className="bg-[#0a0f1d] border border-white/5 rounded-3xl p-7 flex flex-col justify-between group hover:border-white/10 transition-all shadow-xl">
        <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform">{icon}</div>
            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md ${trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {trend}
            </div>
        </div>
        <div>
            <h3 className="text-4xl font-black text-white font-fredoka tracking-tighter mb-1">{value}</h3>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">{label}</p>
        </div>
    </div>
);

const CategoryRow = ({ label, percentage, color }: any) => (
    <div className="group cursor-default">
        <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-400 group-hover:text-white transition-colors">{label}</span>
            <span className="text-[11px] font-black text-white font-fredoka">{percentage}%</span>
        </div>
        <div className="h-2 bg-slate-900 rounded-full overflow-hidden shadow-inner">
            <div
                className={`h-full ${color} transition-all duration-1000 ease-out delay-200 group-hover:brightness-125`}
                style={{ width: `${percentage}%` }}
            />
        </div>
    </div>
);

export default Reports;
