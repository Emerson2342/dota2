import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, } from 'react-native';

import Logo from "../../images/dota2Icon.png"
import { styles } from './styles';
import { Heroes } from '../BuscarPlayers/props';
import axios from 'axios';


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
                style={{ position: "absolute" }}
                source={
                    require('../../images/splash.jpg')
                }
            />
            <View
                style={styles.buttonContainer}
            >
                <TouchableOpacity
                    onPress={navToPlayers}
                    style={styles.button}
                >
                    <Text style={styles.textButton}> Procurar Players</Text>
                </TouchableOpacity>
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
                <TouchableOpacity
                    onPress={navToListaDeHerois}
                    style={styles.button}
                >
                    <Text style={styles.textButton}>Lista de Heróis</Text>
                </TouchableOpacity>
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