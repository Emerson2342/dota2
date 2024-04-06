import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';

import Logo from "../../images/dota2Icon.png"
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
            <MotiView
                style={{ width: '100%', }}
                from={{ translateX: -200, opacity: 1 }}
                animate={{ translateX: 0, opacity: 1 }}
                transition={{ type: 'spring', duration: 5000 }}
            >
                <Image
                    source={
                        require('../../images/splash.jpg')
                    }
                />
            </MotiView>
            <View
                style={styles.buttonContainer}
            ><MotiView
                style={styles.button}
                from={{ translateY: -200, opacity: 1 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ type: 'spring', duration: 5000 }}
            >
                    <TouchableOpacity
                        onPress={navToPlayers}

                    >
                        <Text style={styles.textButton}> Procurar Players</Text>
                    </TouchableOpacity>
                </MotiView>
                {/*  <TouchableOpacity
                    onPress={navToProPlayes}
                    style={styles.button}
                >
                    <Text style={styles.textButton}>Procurar Pro Players</Text>
                </TouchableOpacity> */}
                {/*  <TouchableOpacity
                    onPress={navToHeroisMaisJogados}
                    style={styles.button}
                >
                    <Text style={styles.textButton}>Heróis Mais Jogados</Text>
                </TouchableOpacity> */}
                <MotiView
                    style={styles.button}
                    from={{ translateY: -200, opacity: 0 }}
                    animate={{ translateY: 0, opacity: 1 }}
                    transition={{ type: 'spring', duration: 3000 }}
                >
                    <TouchableOpacity
                        onPress={navToListaDeHerois}
                    >
                        <Text style={styles.textButton}>Lista de Heróis</Text>
                    </TouchableOpacity>
                </MotiView>
                {/*   <TouchableOpacity
                    onPressIn={navToPartidasPorId}
                    style={styles.button}
                >
                    <Text style={styles.textButton}>Buscar Partidas</Text>
                </TouchableOpacity> */}

            </View>
        </View >
    );
}