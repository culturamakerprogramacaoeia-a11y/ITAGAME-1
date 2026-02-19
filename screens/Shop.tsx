import React, { useState } from 'react';
import Card from '../components/Card';
import { SHOP_ITEMS } from '../constants';

interface ShopProps {
  coins: number;
}

const Shop: React.FC<ShopProps> = ({ coins }) => {
  const [currentCoins, setCurrentCoins] = useState(coins);
  const [purchased, setPurchased] = useState<string[]>([]);
  const [category, setCategory] = useState('Todos');

  const handleBuy = (item: any) => {
    if (purchased.includes(item.id)) {
      alert('Você já possui este item!');
      return;
    }
    if (currentCoins >= item.price) {
      if (confirm(`Confirmar compra de ${item.name} por ${item.price} moedas?`)) {
        setCurrentCoins(prev => prev - item.price);
        setPurchased(prev => [...prev, item.id]);
        alert('🎉 Compra realizada com sucesso! O item foi enviado para seu inventário.');
      }
    } else {
      alert('❌ Moedas insuficientes! Continue completando missões para ganhar mais.');
    }
  };

  const filteredItems = category === 'Todos'
    ? SHOP_ITEMS
    : SHOP_ITEMS.filter(item => item.category === category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace('poderes', 'powerup'));

  return (
    <div className="p-6 space-y-8 pb-24 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-500 font-black uppercase text-[10px] tracking-[0.3em]">Mercado CEITEC</h2>
          <h1 className="text-4xl font-black font-fredoka uppercase tracking-tight text-white">Loja ITA</h1>
        </div>
        <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-[28px] px-6 py-3 flex items-center gap-3 shadow-xl shadow-amber-900/10">
          <span className="text-2xl animate-pulse">💰</span>
          <span className="text-xl font-black text-amber-500 tracking-tight">{currentCoins.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
        {['Todos', 'Avatar', 'Poderes', 'Real'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-8 py-3 rounded-2xl whitespace-nowrap font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 border ${category === cat ? 'bg-violet-600 text-white border-violet-500 shadow-xl shadow-violet-900/30' : 'bg-slate-900 text-slate-500 border-white/5 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {filteredItems.map(item => (
          <Card key={item.id} className="flex flex-col items-center text-center p-6 bg-[#0a0f1d] border-white/5 hover:border-violet-500/30 transition-all group relative overflow-hidden">
            {purchased.includes(item.id) && (
              <div className="absolute top-2 right-2 bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-widest z-20">Adquirido</div>
            )}
            <div className={`w-24 h-24 bg-slate-950 rounded-[32px] flex items-center justify-center text-5xl mb-6 shadow-inner border border-white/5 transition-all duration-500 ${purchased.includes(item.id) ? 'grayscale opacity-40' : 'group-hover:scale-110 group-hover:rotate-6'}`}>
              {item.icon}
            </div>
            <div className="flex-1 space-y-2 mb-6">
              <h3 className="font-black text-xs uppercase tracking-tight text-white leading-tight min-h-[32px] flex items-center justify-center">{item.name}</h3>
              <p className="text-[10px] text-slate-500 font-bold leading-tight opacity-0 group-hover:opacity-100 transition-opacity">{item.description}</p>
            </div>
            <button
              onClick={() => handleBuy(item)}
              disabled={purchased.includes(item.id)}
              className={`w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all font-black text-[10px] uppercase tracking-widest border ${purchased.includes(item.id) ? 'bg-slate-800 text-slate-600 border-transparent' : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-500/20 hover:brightness-110 shadow-lg shadow-emerald-900/20'}`}
            >
              <span>{item.price}</span>
              <span className="text-xs">💰</span>
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;
