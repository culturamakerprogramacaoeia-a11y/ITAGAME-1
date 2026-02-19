import React, { useState } from 'react';
import Card from '../../components/Card';
import { StudentRecord } from '../../types';

interface StudentManagerProps {
  students: StudentRecord[];
  onAdd: (student: StudentRecord) => void;
  onDelete: (id: string) => void;
}

const StudentManager: React.FC<StudentManagerProps> = ({ students, onAdd, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    if (confirm(`🚨 REMOVER ALUNO: ${name.toUpperCase()}?\n\nEsta ação não pode ser desfeita.`)) {
      onDelete(id);
    }
  };

  const handleCreateMock = () => {
    const id = Math.random().toString(36).substr(2, 9);
    onAdd({
      id,
      name: `Novo Aluno ${students.length + 1}`,
      email: `aluno${id}@ceitec.edu`,
      class: '9º Ano A',
      level: 1,
      xp: 0,
      coins: 100,
      missionsCompleted: 0,
      lastActive: 'Agora',
      avatar: '👶'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40">🔍</span>
          <input
            type="text"
            placeholder="Buscar por nome ou turma..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-white/5 rounded-2xl text-sm focus:border-cyan-500/50 outline-none transition-all placeholder:text-slate-600 font-bold"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={() => alert('Base de dados exportada para base_alunos.csv')} className="flex-1 md:flex-none px-6 py-3.5 bg-slate-900 hover:bg-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 border border-white/5 text-slate-400">Exportar CSV</button>
          <button onClick={handleCreateMock} className="flex-1 md:flex-none px-8 py-3.5 bg-violet-600 hover:bg-violet-500 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-xl shadow-violet-900/20 text-white flex items-center justify-center gap-2">
            <span>+</span> Novo Aluno
          </button>
        </div>
      </div>

      {/* Table Card */}
      <Card className="p-0 overflow-hidden border-white/10 shadow-2xl bg-slate-900/50">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-slate-950/50 border-b border-white/5">
              <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                <th className="px-8 py-6">Estudante</th>
                <th className="px-8 py-6">Turma</th>
                <th className="px-8 py-6">Progresso</th>
                <th className="px-8 py-6">Economia</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Controle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-white/[0.03] transition-all group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-slate-800 flex items-center justify-center text-2xl shadow-inner border border-white/5 group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
                        {student.avatar}
                      </div>
                      <div>
                        <p className="text-[15px] font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{student.name}</p>
                        <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-black text-slate-400 bg-white/5 px-3 py-1.5 rounded-lg uppercase tracking-widest border border-white/5">{student.class}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Level {student.level}</span>
                        <span className="text-[9px] text-slate-500 font-bold">{student.xp.toLocaleString()} XP</span>
                      </div>
                      <div className="w-32 h-1.5 bg-slate-950 rounded-full overflow-hidden shadow-inner border border-white/5">
                        <div className="h-full bg-gradient-to-r from-violet-600 to-cyan-400" style={{ width: `${(student.xp % 1000) / 10}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/5 border border-amber-500/10 rounded-xl w-fit">
                      <span className="text-xs">💰</span>
                      <span className="text-xs font-black text-amber-500">{student.coins.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none">{student.lastActive}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <button onClick={() => alert(`Análise detalhada: ${student.name}`)} className="p-3 bg-white/5 hover:bg-violet-600/20 text-slate-500 hover:text-violet-400 rounded-[18px] transition-all border border-white/5" title="Ver Perfil">
                        <span>👁️</span>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleDelete(student.id, student.name); }} className="p-3 bg-white/5 hover:bg-rose-500/20 text-slate-500 hover:text-rose-500 rounded-[18px] transition-all border border-white/5" title="Remover">
                        <span>🗑️</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <p className="text-slate-500 font-black uppercase text-xs tracking-[0.3em]">Nenhum aluno encontrado</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default StudentManager;
