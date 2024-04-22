import React, { createContext, useContext, useState, ReactNode } from 'react';

interface KeyCounterContextType {
    keyCounter: number;
    setKeyCounter: React.Dispatch<React.SetStateAction<number>>;
    homeFocus: boolean;
    setHomeFocus: React.Dispatch<React.SetStateAction<boolean>>;
    playerFocus: boolean;
    setPlayerFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

interface KeyCounterProviderProps {
    children: ReactNode;
}

const KeyCounterContext = createContext<KeyCounterContextType | undefined>(undefined);

export const KeyCounterProvider = ({ children }: KeyCounterProviderProps) => {
    const [keyCounter, setKeyCounter] = useState(0);
    const [homeFocus, setHomeFocus] = useState(true);
    const [playerFocus, setPlayerFocus] = useState(false);

    return (
        <KeyCounterContext.Provider value={{ keyCounter, setKeyCounter, homeFocus, setHomeFocus, playerFocus, setPlayerFocus }}>
            {children}
        </KeyCounterContext.Provider>
    );
};

export const useKeyCounter = () => {
    const context = useContext(KeyCounterContext);
    if (!context) {
        throw new Error('useKeyCounter deve ser usado dentro de um KeyCounterProvider');
    }
    return context;
};
