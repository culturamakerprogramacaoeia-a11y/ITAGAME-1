import { UserStats } from '../types';

export const fetchUserStats = async (): Promise<Partial<UserStats>> => {
    try {
        const response = await fetch('/api/stats');
        if (!response.ok) throw new Error('Falha ao buscar estatísticas');
        const data = await response.json();

        // Mapeando dados do Backend para o Frontend
        return {
            xp: data.xp,
            level: data.level,
            maxXp: data.next_level_xp,
            // Coins e Name ainda fixos até termos login completo
        };
    } catch (error) {
        console.error('Erro na API:', error);
        return {};
    }
};
