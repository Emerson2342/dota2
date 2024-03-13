import React, { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlayerModel, RecentMatches } from '../../screens/BuscarPlayers/props';


interface PlayerContextData {
    playerData: PlayerModel | null;
    recentMatches: RecentMatches[];
    playerId: string;
    setPlayerData: Dispatch<SetStateAction<PlayerModel | null>>;
    setRecentMatches: Dispatch<SetStateAction<RecentMatches[]>>;
    setPlayerId: Dispatch<SetStateAction<string>>;
}


const PlayerContext = createContext<PlayerContextData | undefined>(undefined);


interface PlayerProviderProps {
    children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
    const [playerData, setPlayerData] = useState<PlayerModel | null>(null);
    const [recentMatches, setRecentMatches] = useState<RecentMatches[]>([]);
    const [playerId, setPlayerId] = useState('');


    useEffect(() => {
        const loadData = async () => {
            try {
                const storedPlayerData = await AsyncStorage.getItem('playerData');
                const storedRecentMatches = await AsyncStorage.getItem('recentMatches');
                const storedPlayerId = await AsyncStorage.getItem('playerId');

                if (storedPlayerData) {
                    setPlayerData(JSON.parse(storedPlayerData));
                }

                if (storedRecentMatches) {
                    setRecentMatches(JSON.parse(storedRecentMatches));
                }

                if (storedPlayerId) {
                    setPlayerId(storedPlayerId);
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
        setPlayerData,
        setRecentMatches,
        setPlayerId,
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
