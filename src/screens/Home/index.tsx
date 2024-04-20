import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Easing } from 'react-native';

import { styles } from './styles';
import { Heroes } from '../BuscarPlayers/props';
import { MotiView } from 'moti';
import { useKeyCounter } from '../../context/useKeyCounter';


export function Home({ navigation }: any) {
    const { keyCounter, setKeyCounter, homeFocus, setHomeFocus } = useKeyCounter();

    function resetAnimation() {
        setKeyCounter(keyCounter + 1);
    }

    console.log(keyCounter)

    function navToPlayers() {
        setHomeFocus(false)
        resetAnimation()
        setTimeout(() => {
            navigation.navigate("buscarPlayers")
        }, 800)
    }

    function navToListaDeHerois() {
        setHomeFocus(false)
        resetAnimation()
        setTimeout(() => {
            navigation.navigate('listaDeHerois');
        }, 800);
    }

    return (
        <View style={styles.container}>
            <Image
                style={{ position: 'absolute' }}
                source={
                    require('../../images/wallpaper.jpg')
                }
            />
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