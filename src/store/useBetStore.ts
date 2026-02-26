import { create } from 'zustand';
import { persist, PersistStorage, StorageValue } from 'zustand/middleware';
import { Bet, BetStatus, Sport } from '../types/bet';
import { useBankStore } from './useBankStore';

// Interface para stats de lucro das apostas
interface BetProfitStats {
  totalBetProfit: number;
}

interface BetStoreState {
  bets: Bet[];
}

interface BetStoreActions {
  addBet: (bet: Omit<Bet, 'id'>) => void;
  updateBetStatus: (id: string, status: BetStatus) => void;
  deleteBet: (id: string) => void;
  getBetsByStatus: (status: BetStatus) => Bet[];
  getBetsBySport: (sport: Sport) => Bet[];
  getBetsByDateRange: (startDate: Date, endDate: Date) => Bet[];
  getStats: (filteredBets?: Bet[]) => {
    totalBets: number;
    totalWon: number;
    totalLost: number;
    totalAmount: number;
    totalWinnings: number;
    winRate: number;
    profit: number;
  };
  getProfitStats: (filteredBets?: Bet[]) => BetProfitStats;
  resetBets: () => void;
  clearBets: () => void;
}

type BetStore = BetStoreState & BetStoreActions;

// Helper para garantir que bet.date seja um objeto Date após reidratação
const validateAndParseBet = (bet: any): Bet | null => {
  try {
    if (
      typeof bet === 'object' &&
      bet !== null &&
      typeof bet.id === 'string' &&
      typeof bet.sport === 'string' &&
      ['Soccer', 'Basketball', 'Tennis', 'Volleyball', 'Other'].includes(bet.sport) &&
      typeof bet.betType === 'string' &&
      ['Resultado', 'Gols', 'Handicap', 'Escanteios', 'Cartões', 'Jogadores', 'Por Tempo', 'Especiais'].includes(bet.betType) &&
      typeof bet.odd === 'number' && bet.odd > 0 &&
      typeof bet.amount === 'number' && bet.amount > 0 &&
      typeof bet.status === 'string' &&
      ['Pending', 'Won', 'Lost'].includes(bet.status) &&
      (bet.date instanceof Date || typeof bet.date === 'string') // Aceita Date ou string
    ) {
      return {
        ...bet,
        date: new Date(bet.date), // Converte para Date se for string
        description: bet.description ?? '', // Garante que description exista
      };
    }
    console.warn("Invalid bet structure found during validation:", bet);
    return null;
  } catch (error) {
    console.error("Error validating/parsing bet:", error, bet);
    return null;
  }
};

// Configuração de armazenamento com serialização/desserialização de datas
const storageWithDateHandling: PersistStorage<BetStoreState> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    const parsed = JSON.parse(str) as StorageValue<BetStoreState>;
    // Converte datas string de volta para Date objects
    const betsWithDates = parsed.state.bets.map(bet => validateAndParseBet(bet)).filter((b): b is Bet => b !== null);
    return {
      ...parsed,
      state: {
        ...parsed.state,
        bets: betsWithDates,
      },
    };
  },
  setItem: (name, newValue) => {
    // JSON.stringify converte Date para string ISO automaticamente
    localStorage.setItem(name, JSON.stringify(newValue));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

export const useBetStore = create<BetStore>()(
  persist(
    (set, get) => ({
      bets: [],
      addBet: (bet) => {
        const newBet: Bet = {
          ...bet,
          id: crypto.randomUUID(),
          date: new Date(bet.date), // Garante que a data seja Date
        };
        set((state) => ({ bets: [...state.bets, newBet] }));
        // Chama a ação do bankStore para registrar a dedução do saldo
        useBankStore.getState().registerBetPlaced(newBet.amount);
      },
      updateBetStatus: (id, status) => {
        const betToUpdate = get().bets.find((bet) => bet.id === id);
        if (!betToUpdate) return; // Aposta não encontrada

        // Atualiza o estado local da aposta
        set((state) => ({
          bets: state.bets.map((bet) =>
            bet.id === id ? { ...bet, status } : bet
          ),
        }));

        // Chama a ação apropriada do bankStore
        if (status === 'Won') {
          const returnedAmount = betToUpdate.amount * betToUpdate.odd;
          useBankStore.getState().registerBetWon(returnedAmount);
        }
        // Se o status mudar para 'Lost', nenhuma ação no saldo é necessária aqui
        // porque o valor já foi deduzido quando a aposta foi feita.
        // A lógica de devolução ao deletar aposta pendente está em deleteBet.
      },
      deleteBet: (id) => {
        const betToDelete = get().bets.find((bet) => bet.id === id);
        if (!betToDelete) return; // Aposta não encontrada

        // Remove a aposta do estado local
        set((state) => ({
          bets: state.bets.filter((bet) => bet.id !== id),
        }));

        // Chama a ação do bankStore para potencialmente devolver o valor apostado
        // Passa o status da aposta ANTES de ser deletada
        useBankStore.getState().registerBetDeletedOrLost(betToDelete.amount, betToDelete.status);
      },
      getBetsByStatus: (status) => get().bets.filter((bet) => bet.status === status),
      getBetsBySport: (sport) => get().bets.filter((bet) => bet.sport === sport),
      getBetsByDateRange: (startDate, endDate) => {
         const start = new Date(startDate); // Garante que sejam datas
         const end = new Date(endDate);
        return get().bets.filter(
          (bet) => {
             const betDate = new Date(bet.date); // Garante que a data da aposta seja comparada como Date
             return betDate >= start && betDate <= end;
          }
        );
      },
      getProfitStats: (filteredBets?) => {
          const bets = filteredBets || get().bets;
          const totalAmountStaked = bets.reduce((sum, bet) => sum + bet.amount, 0);
          const totalReturnedFromWins = bets
            .filter((bet) => bet.status === 'Won')
            .reduce((sum, bet) => sum + bet.amount * bet.odd, 0);
          const totalBetProfit = totalReturnedFromWins - totalAmountStaked;
          return { totalBetProfit };
      },
      getStats: (filteredBets?) => {
        const bets = filteredBets || get().bets;
        const totalBets = bets.length;
        const totalWon = bets.filter((bet) => bet.status === 'Won').length;
        const totalLost = bets.filter((bet) => bet.status === 'Lost').length;
        const totalAmount = bets.reduce((sum, bet) => sum + bet.amount, 0);
        const totalWinnings = bets
          .filter((bet) => bet.status === 'Won')
          .reduce((sum, bet) => sum + bet.amount * bet.odd, 0);

        const winRate = totalBets > 0 ? (totalWon / (totalWon + totalLost)) * 100 : 0;
        const { totalBetProfit } = get().getProfitStats(bets);

        return {
          totalBets,
          totalWon,
          totalLost,
          totalAmount,
          totalWinnings,
          winRate: parseFloat(winRate.toFixed(2)),
          profit: totalBetProfit,
        };
      },
      resetBets: () => {
        set({ bets: [] });
      },
      clearBets: () => {
        set({ bets: [] });
      },
    }),
    {
      name: 'bet-storage',
      storage: storageWithDateHandling,
    }
  )
); 