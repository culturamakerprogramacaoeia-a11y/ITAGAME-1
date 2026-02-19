import React from 'react';
import Card from '../components/Card';
import { DISCIPLINES } from '../constants';

interface DisciplinesProps {
  onSelect: (id: string) => void;
}

const Disciplines: React.FC<DisciplinesProps> = ({ onSelect }) => {
  return (
    <div className="p-6 space-y-8 pb-32 animate-in fade-in duration-500 font-fredoka">
      <div className="space-y-1">
        <h2 className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em]">Mapa de Conhecimento</h2>
        <h1 className="text-4xl font-black uppercase tracking-tight text-white">Trilhas de Estudos</h1>
      </div>

      <p className="text-slate-400 text-sm font-medium leading-relaxed">Complete os desafios para subir de nível e ganhar moedas.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {DISCIPLINES.map(disc => (
          <Card
            key={disc.id}
            onClick={() => {
              onSelect(disc.id);
            }}
            className={`bg-gradient-to-br ${disc.color} border-none relative overflow-hidden h-44 flex flex-col justify-end group shadow-2xl cursor-pointer active:scale-95 transition-all duration-300 p-8 rounded-[40px]`}
          >
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 p-4 opacity-20 transform -translate-y-4 translate-x-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
              <span className="text-9xl">{disc.icon}</span>
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="bg-white/20 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1 text-[10px] font-black uppercase tracking-widest inline-block mb-1 shadow-lg text-white">
                    Nível {disc.level}
                  </div>
                  <h3 className="text-2xl font-black drop-shadow-xl leading-none uppercase tracking-tighter text-white">{disc.name}</h3>
                </div>
                <div className="text-5xl drop-shadow-2xl group-hover:scale-110 transition-transform origin-center">{disc.icon}</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-80 text-white">
                  <span>Domínio</span>
                  <span>{disc.progress}%</span>
                </div>
                <div className="h-2.5 bg-black/20 rounded-full overflow-hidden border border-white/10 shadow-inner">
                  <div className="h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.7)] transition-all duration-1000" style={{ width: `${disc.progress}%` }} />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Disciplines;
