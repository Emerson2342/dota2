import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Easing } from 'react-native';

import { styles } from './styles';
import { Heroes } from '../BuscarPlayers/props';
import { MotiView } from 'moti';
import { useKeyCounter } from '../../context/useKeyCounter';


export function Home({ navigation }: any) {
    const { keyCounter, setKeyCounter, homeFocus, setHomeFocus, playerFocus, setPlayerFocus } = useKeyCounter();

    function resetAnimation() {
        setKeyCounter(keyCounter + 1);
    }

    console.log(keyCounter)
    console.log(homeFocus)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            resetAnimation();
            homeFocus ? setHomeFocus(true) : setHomeFocus(false);
        });
        return unsubscribe;
    }, [navigation]);

    function navToPlayers() {
        setHomeFocus(false)
        setPlayerFocus(true)
        resetAnimation()
        setTimeout(() => {
            navigation.navigate("buscarPlayers")
        }, 900)
    }

    function navToListaDeHerois() {
        setHomeFocus(false)
        resetAnimation()
        setTimeout(() => {
            navigation.navigate('listaDeHerois');
        }, 900);
    }

    return (
        <View style={styles.container}>
            <  MotiView
                key={keyCounter + 500}
                from={{ opacity: homeFocus ? 0 : 1 }}
                animate={{ opacity: homeFocus ? 1 : 0 }}
                transition={{ duration: 2000 }}
            >
                <Image
                    style={{ position: 'absolute' }}
                    source={
                        require('../../images/home.jpg')
                    }
                />
            </MotiView>
            <  MotiView
                key={keyCounter}
                from={{ translateY: homeFocus ? -500 : 0, opacity: 1 }}
                animate={{ translateY: homeFocus ? 0 : -500, opacity: 1 }}
                transition={{ type: 'spring', duration: 9000 }}
                style={{ flex: 1, top: -100 }}
            >

                <View
                    style={{ width: "50%", alignSelf: 'flex-end', }}
                >
                    <Image
                        style={{ resizeMode: 'contain' }}
                        source={
                            require('../../images/corrente.png')
                        }
                    />
                </View>

                <View
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                        onPress={navToPlayers}
                        style={styles.button}
                    >
                        <Text style={[styles.textButton, { color: '#fff' }]}> P</Text>
                        <Text style={styles.textButton}>rocurar Players</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={navToListaDeHerois}
                        style={styles.button}
                    >
                        <Text style={[styles.textButton, { color: '#fff' }]}>L</Text>
                        <Text style={styles.textButton}>ista de Heróis</Text>
                    </TouchableOpacity>

                </View>
            </MotiView>

        </View >
    );
}