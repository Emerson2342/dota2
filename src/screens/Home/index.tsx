import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';

import { styles } from './styles';
import { Heroes } from '../BuscarPlayers/props';
import { MotiView } from 'moti';


export function Home({ navigation }: any) {

    function navToPartidasPorId() {
        navigation.navigate("buscarPartidasPorId")
    }
    function navToPlayers() {
        navigation.navigate("buscarPlayers")
    }
    function navToProPlayes() {
        navigation.navigate("buscarProPlayers")
    }
    function navToHeroisMaisJogados() {
        navigation.navigate("heroisMaisJogados")
    }
    function navToListaDeHerois() {
        navigation.navigate("listaDeHerois")
    }

    return (
        <View style={styles.container}>

            <Image
                style={{ position: 'absolute' }}
                source={
                    require('../../images/wallpaper.jpg')
                }
            />

            <MotiView
                from={{ translateY: -300, opacity: 1 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'spring', duration: 7000 }}
                style={{ flex: 1 }}
            >
                <View
                    style={{ width: "45%", alignSelf: 'flex-end', }}
                >
                    <Image
                        style={{ resizeMode: 'contain' }}
                        source={
                            require('../../images/corrente.png')
                        }
                    />
                </View>
            </MotiView>
            <MotiView
                from={{ translateY: -300, opacity: 1 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'spring', duration: 7000 }}
                style={{ flex: 1 }}
            >
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