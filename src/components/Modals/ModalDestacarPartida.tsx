import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { styles } from './ModalDestacarPartidaStyles';
import { HeroesList } from '../Heroes/heroesList';
import { MatchDetailsModel } from '../../screens/BuscarPlayers/props';
import { fetchGetMatchDetailsData } from '../../APIs/getDetailsMatch';

export function ModalDestacarPartida(
    {
        handleClose, id, data, modo, heroi, kills, deaths, assists, xp, gold, heroDamage, towerDamage, lhs, resultadoFinal, duracao, hora }:
        {
            handleClose(): void, id: string, data: string, modo: string, heroi: number, kills: number, deaths: number, assists: number,
            xp: number, gold: number, heroDamage: number, towerDamage: number, lhs: number, resultadoFinal: boolean, duracao: string, hora: string
        }) {

    const heroName = HeroesList().find(hero => hero.id == heroi)?.localized_name


    const [matchDetails, setMatchDetails] = useState<MatchDetailsModel | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const recentMatchesDataResponse = await fetchGetMatchDetailsData(id);
                setMatchDetails(recentMatchesDataResponse ?? null);
            } catch (error) {
                console.error('Erro ao buscar detalhes da partida:', error);
            }
        }

        fetchData();
    }, [id]);

    console.log(JSON.stringify(matchDetails, null, 2))


    return (
        <View style={styles.container}>

            <View
                style={(resultadoFinal == true) ? styles.modal : [styles.modal, { borderColor: "red" }]}
            >
                {/*    <Image
                    style={styles.image}
                    source={require('../../images/matchDetails.jpg')}
                /> */}
                <View
                    style={styles.modalContent}>

                    <Text>{matchDetails?.players[0].hero_id}</Text>


                    {/*  <View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>Id da partida:</Text><Text style={resultadoFinal ? styles.textValue : [styles.textValue, { color: "red" }]}> {id}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>Data:</Text><Text style={resultadoFinal ? styles.textValue : [styles.textValue, { color: "red" }]}> {data}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>Modo:</Text><Text style={resultadoFinal ? styles.textValue : [styles.textValue, { color: "red" }]}> {modo}</Text>
                        </View>

                        <View style={styles.info}>
                            <Text style={styles.textNome}>Duração:</Text><Text style={resultadoFinal ? styles.textValue : [styles.textValue, { color: "red" }]}> {duracao}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>Hora:</Text><Text style={resultadoFinal ? styles.textValue : [styles.textValue, { color: "red" }]}> {hora}</Text>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.textNome}>Herói:</Text><Text style={resultadoFinal ? styles.textValue : [styles.textValue, { color: "red" }]}> {heroName}</Text>
                        </View>

                    </View>
                    <View>
                        <View style={[styles.info, { justifyContent: "flex-end" }]}>
                            <Text style={styles.textNome}>KDA:</Text><Text style={resultadoFinal ? styles.textValue : [styles.textValue, { color: "red" }]}> {kills}/{deaths}/{assists}</Text>
                        </View>
                        <View style={[styles.info, { justifyContent: "flex-end" }]}>
                            <Text style={styles.textNome}>XP por minuto:</Text><Text style={resultadoFinal ? styles.textValue : [styles.textValue, { color: "red" }]}> {xp}</Text>
                        </View>
                        <View style={[styles.info, { justifyContent: "flex-end" }]}>
                            <Text style={styles.textNome}>GOLD por minuto:</Text><Text style={resultadoFinal ? styles.textValue : [styles.textValue, { color: "red" }]}> {gold}</Text>
                        </View>
                        <View style={[styles.info, { justifyContent: "flex-end" }]}>
                            <Text style={styles.textNome}>Dano em heróis:</Text><Text style={resultadoFinal ? styles.textValue : [styles.textValue, { color: "red" }]}> {heroDamage}</Text>
                        </View>
                        <View style={[styles.info, { justifyContent: "flex-end" }]}>
                            <Text style={styles.textNome}>Dano em torres:</Text><Text style={resultadoFinal ? styles.textValue : [styles.textValue, { color: "red" }]}> {towerDamage}</Text>
                        </View>
                        <View style={[styles.info, { justifyContent: "flex-end" }]}>
                            <Text style={[styles.textNome,]}>LH's:</Text><Text style={resultadoFinal ? styles.textValue : [styles.textValue, { color: "red" }]}> {lhs}</Text>
                        </View>
                    </View> */}
                </View>

                <TouchableOpacity
                    onPress={() => handleClose()}
                    style={resultadoFinal ? styles.button : [styles.button, { backgroundColor: "red" }]}>
                    <Text
                        style={styles.textButton}
                    >Fechar</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}