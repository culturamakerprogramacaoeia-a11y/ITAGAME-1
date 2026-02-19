import React, { useState, useEffect } from 'react';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Disciplines from './screens/Disciplines';
import Shop from './screens/Shop';
import Ranking from './screens/Ranking';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './screens/admin/AdminDashboard';
import StudentManager from './screens/admin/StudentManager';
import ValidationPortal from './screens/admin/ValidationPortal';
import MissionManager from './screens/admin/MissionManager';
import Reports from './screens/admin/Reports';
import { Screen, AdminScreen, UserStats, Mission, StudentRecord, Submission, ShopItem, RankingEntry } from './types';
import { MISSIONS, MOCK_STUDENTS, MOCK_SUBMISSIONS, SHOP_ITEMS, RANKING } from './constants';

// ========== LOCAL STORAGE HELPERS ==========
const STORAGE_KEY = 'itagame_full_state_v1';

interface AppState {
  userStats: UserStats;
  missions: Mission[];
  students: StudentRecord[];
  submissions: Submission[];
  shopItems: ShopItem[];
  ranking: RankingEntry[];
  purchasedItems: string[];
}

const INITIAL_STATE: AppState = {
  userStats: {
    name: 'Ana Luiza',
    level: 10,
    xp: 2486,
    maxXp: 5000,
    coins: 10996,
    avatar: '👩'
  },
  missions: MISSIONS,
  students: MOCK_STUDENTS,
  submissions: MOCK_SUBMISSIONS,
  shopItems: SHOP_ITEMS,
  ranking: RANKING,
  purchasedItems: []
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.DASHBOARD);
  const [adminScreen, setAdminScreen] = useState<AdminScreen>(AdminScreen.OVERVIEW);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Central State
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  // Persist State
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // ========== ACTIONS ==========

  const handleLogin = (adminMode: boolean) => {
    setIsLoggedIn(true);
    setIsAdmin(adminMode);
    setAdminScreen(AdminScreen.OVERVIEW);
    setCurrentScreen(Screen.DASHBOARD);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentScreen(Screen.DASHBOARD);
  };

  // Student Actions
  const addXp = (amount: number) => {
    setState(prev => ({
      ...prev,
      userStats: { ...prev.userStats, xp: Math.min(prev.userStats.maxXp, prev.userStats.xp + amount) }
    }));
  };

  // Admin Actions
  const addStudent = (newStudent: StudentRecord) => {
    setState(prev => ({ ...prev, students: [newStudent, ...prev.students] }));
  };

  const deleteStudent = (id: string) => {
    setState(prev => ({ ...prev, students: prev.students.filter(s => s.id !== id) }));
  };

  const addMission = (newMission: Mission) => {
    setState(prev => ({ ...prev, missions: [newMission, ...prev.missions] }));
  };

  const deleteMission = (id: string) => {
    setState(prev => ({ ...prev, missions: prev.missions.filter(m => m.id !== id) }));
  };

  const approveSubmission = (id: string) => {
    setState(prev => {
      const sub = prev.submissions.find(s => s.id === id);
      if (!sub) return prev;
      return {
        ...prev,
        submissions: prev.submissions.map(s => s.id === id ? { ...s, status: 'approved' as const } : s)
      };
    });
    alert('Submissão aprovada! O aluno recebeu a recompensa.');
  };

  const rejectSubmission = (id: string) => {
    setState(prev => ({
      ...prev,
      submissions: prev.submissions.map(s => s.id === id ? { ...s, status: 'rejected' as const } : s)
    }));
    alert('Submissão recusada.');
  };

  // ========== RENDER LOGIC ==========

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (isAdmin) {
    const renderAdminScreen = () => {
      switch (adminScreen) {
        case AdminScreen.OVERVIEW:
          return <AdminDashboard students={state.students} submissions={state.submissions} missions={state.missions} />;
        case AdminScreen.STUDENTS:
          return <StudentManager students={state.students} onAdd={addStudent} onDelete={deleteStudent} />;
        case AdminScreen.VALIDATION:
          return <ValidationPortal submissions={state.submissions} onApprove={approveSubmission} onReject={rejectSubmission} />;
        case AdminScreen.MISSIONS:
          return <MissionManager missions={state.missions} onAdd={addMission} onDelete={deleteMission} />;
        case AdminScreen.ECONOMY:
          return (
            <div className="p-8">
              <h1 className="text-3xl font-bold uppercase font-fredoka flex items-center gap-4">
                <span className="text-amber-400">💰</span> Gestão de Loja
              </h1>
              <p className="mt-4 text-slate-400">Configure os itens da Loja CEITEC e prêmios em moedas.</p>
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.shopItems.map(item => (
                  <div key={item.id} className="bg-slate-900 border border-white/5 p-6 rounded-[32px] flex items-center gap-6">
                    <span className="text-4xl">{item.icon}</span>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{item.name}</h3>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{item.price} moedas</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        case AdminScreen.REPORTS:
          return <Reports students={state.students} missions={state.missions} submissions={state.submissions} />;
        case AdminScreen.SETTINGS:
          return (
            <div className="p-8 max-w-2xl">
              <h1 className="text-3xl font-bold uppercase font-fredoka flex items-center gap-4 mb-8">
                <span className="text-violet-500">⚙️</span> Ajustes do Sistema
              </h1>
              <div className="space-y-6 bg-slate-900 p-10 rounded-[40px] border border-white/5">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Título do Evento</label>
                  <input type="text" defaultValue="Semana Maker 2026" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-sm" />
                </div>
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Taxa de Conversão XP/Nível</label>
                  <select className="w-full bg-slate-950 border border-white/10 rounded-2xl px-5 py-4 text-sm">
                    <option>Padrão (1000 XP)</option>
                    <option>Desafio (1500 XP)</option>
                    <option>Hardcore (2000 XP)</option>
                  </select>
                </div>
                <button className="w-full py-4 bg-violet-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-violet-500 transition-all shadow-xl shadow-violet-900/20">Salvar Modificações</button>
              </div>
            </div>
          );
        default: return <AdminDashboard students={state.students} submissions={state.submissions} missions={state.missions} />;
      }
    };

    return (
      <AdminLayout activeScreen={adminScreen} onNavigate={setAdminScreen} onLogout={handleLogout}>
        {renderAdminScreen()}
      </AdminLayout>
    );
  }

  // Student View
  const renderStudentScreen = () => {
    switch (currentScreen) {
      case Screen.DASHBOARD:
        return <Dashboard stats={state.userStats} onNavigate={setCurrentScreen} />;
      case Screen.DISCIPLINES:
        return <Disciplines onSelect={(id) => { console.log('Selected:', id); alert('Iniciando jornada!'); }} />;
      case Screen.SHOP:
        return <Shop coins={state.userStats.coins} />;
      case Screen.RANKING:
        return <Ranking />;
      case Screen.ACTIVITY:
        return (
          <div className="p-8">
            <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-8">Atitudes</h1>
            <div className="space-y-4">
              {[
                { label: 'Bullying', cost: -1000, xp: 0, desc: 'Incomodar o colega', color: 'bg-rose-500' },
                { label: 'Entregar exercícios', cost: 250, xp: 250, desc: 'Entregar no dia', color: 'bg-emerald-500' },
                { label: 'Provas na data', cost: 150, xp: 150, desc: 'Fazer na data certa', color: 'bg-violet-500' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-900/50 p-6 rounded-[32px] border-l-8 border-white/5 flex items-center justify-between" style={{ borderLeftColor: item.cost < 0 ? '#f43f5e' : '#10b981' }}>
                  <div>
                    <h3 className="font-black text-white uppercase tracking-tight">{item.label}</h3>
                    <p className="text-[10px] text-slate-500 font-bold">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-black ${item.cost < 0 ? 'text-rose-500' : 'text-amber-400'}`}>{item.cost > 0 ? '+' : ''}{item.cost} 💰</p>
                    {item.xp > 0 && <p className="text-[10px] font-black text-violet-400">+{item.xp} XP</p>}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setCurrentScreen(Screen.DASHBOARD)} className="mt-8 w-full py-4 bg-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest">Voltar</button>
          </div>
        );
      default:
        return <Dashboard stats={state.userStats} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <Layout
      activeScreen={currentScreen}
      stats={state.userStats}
      onNavigate={setCurrentScreen}
      onLogout={handleLogout}
    >
      {renderStudentScreen()}
    </Layout>
  );
};

export default App;
