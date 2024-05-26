import React, { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

//interface Friend
interface Friend {
    friend: string;
    idFriend: number;
}

//contexto dos dados
interface FriendsListContextData {
    friendsList: Friend[];
    setFriendsList: Dispatch<SetStateAction<Friend[]>>;
}

//criação do Context
const FriendsListContext = createContext<FriendsListContextData | undefined>(undefined);

//definição das props do provider
interface FriendsListProviderProps {
    children: ReactNode;
}

//criação do provider
export const FriendsListProvider: React.FC<FriendsListProviderProps> = ({ children }) => {
    const [friendsList, setFriendsList] = useState<Friend[]>([]);

    //carregando dados do AsyncStorage
    useEffect(() => {
        const loadFriendsList = async () => {
            try {
                const storedFriendsList = await AsyncStorage.getItem('friendsList');
                if (storedFriendsList) {
                    setFriendsList(JSON.parse(storedFriendsList));
                }
            } catch (error) {
                console.error('Erro ao carregar dados do AsyncStorage:', error);
            }
        };
        loadFriendsList();
    }, []);

    //salvando dados no AsyncStorage
    useEffect(() => {
        const saveFriendsList = async () => {
            try {
                await AsyncStorage.setItem('friendsList', JSON.stringify(friendsList));
            } catch (error) {
                console.error('Erro ao salvar dados no AsyncStorage:', error);
            }
        };
        saveFriendsList();
    }, [friendsList]);

    //valor do contexto
    const contextValue: FriendsListContextData = {
        friendsList,
        setFriendsList,
    };

    return (
        <FriendsListContext.Provider value={contextValue}>
            {children}
        </FriendsListContext.Provider>
    );
};

//hook para usar o contexto
export const useFriendsListContext = () => {
    const context = useContext(FriendsListContext);
    if (!context) {
        throw new Error('useFriendsListContext deve ser usado dentro de um FriendsListProvider');
    }
    return context;
};
