import React, { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayerModel, RecentMatches, WL } from '../../screens/BuscarPlayers/props';


interface PlayerContextData {
    playerData: PlayerModel | null;
    recentMatches: RecentMatches[];
    playerId: string;
    idAtual: string;
    winrate: WL | null;
    setPlayerData: Dispatch<SetStateAction<PlayerModel | null>>;
    setRecentMatches: Dispatch<SetStateAction<RecentMatches[]>>;
    setPlayerId: Dispatch<SetStateAction<string>>;
    setIdAtual: Dispatch<SetStateAction<string>>;
    setWinrate: Dispatch<SetStateAction<WL | null>>;

}

const PlayerContext = createContext<PlayerContextData | undefined>(undefined);
interface PlayerProviderProps {
    children: ReactNode;
}
export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
    const [playerData, setPlayerData] = useState<PlayerModel | null>(null);
    const [recentMatches, setRecentMatches] = useState<RecentMatches[]>([]);
    const [playerId, setPlayerId] = useState('');
    const [idAtual, setIdAtual] = useState('');
    const [winrate, setWinrate] = useState<WL | null>(null);
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedPlayerData = await AsyncStorage.getItem('playerData');
                const storedRecentMatches = await AsyncStorage.getItem('recentMatches');
                const storedPlayerId = await AsyncStorage.getItem('playerId');
                const storedIdAtual = await AsyncStorage.getItem('idAtual');
                const storedWinrate = await AsyncStorage.getItem('winrate');

                if (storedPlayerData) {
                    setPlayerData(JSON.parse(storedPlayerData));
                }

                if (storedRecentMatches) {
                    setRecentMatches(JSON.parse(storedRecentMatches));
                }

                if (storedPlayerId) {
                    setPlayerId(storedPlayerId);
                }
                if (storedIdAtual) {
                    setIdAtual(storedIdAtual);
                }
                if (storedWinrate) {
                    setWinrate(JSON.parse(storedWinrate));
                }
            } catch (error) {
                console.error('Erro ao carregar dados do AsyncStorage:', error);
            }
        };

        loadData();
    }, []);


    useEffect(() => {
        const saveData = async () => {
            try {
                await AsyncStorage.setItem('playerData', JSON.stringify(playerData));
                await AsyncStorage.setItem('recentMatches', JSON.stringify(recentMatches));
                await AsyncStorage.setItem('playerId', playerId);
                await AsyncStorage.setItem('idAtual', idAtual);
                await AsyncStorage.setItem('winrate', JSON.stringify(winrate));
            } catch (error) {
                console.error('Erro ao salvar dados no AsyncStorage:', error);
            }
        };

        saveData();
    }, [playerData, recentMatches, playerId]);

    const contextValue: PlayerContextData = {
        playerData,
        recentMatches,
        playerId,
        idAtual,
        setPlayerData,
        setRecentMatches,
        setPlayerId,
        setIdAtual,
        winrate,
        setWinrate
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayerContext = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayerContext deve ser usado dentro de um PlayerProvider');
    }
    return context;
};
