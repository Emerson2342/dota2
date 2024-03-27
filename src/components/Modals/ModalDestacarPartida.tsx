import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Platform } from 'react-native';

import { styles } from './ModalDestacarPartidaStyles';
import { HeroesList } from '../Heroes/heroesList';
import { MatchDetailsModel } from '../../screens/BuscarPlayers/props';
import { fetchGetMatchDetailsData } from '../../APIs/getDetailsMatch';
import { PICTURE_HERO_BASE_URL } from '../../constants/player';
import { Medal } from '../Medals/MedalsList';
const heroesList = HeroesList();

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

    const renderItemIluminados = ({ item }: { item: MatchDetailsModel }) => {
        const radiant = item.players.slice(0, 5);

        return (
            <View
                style={{ alignItems: "center" }}
            >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>{item.radiant_score}</Text>

                {item.radiant_win ? <Text style={styles.title}>Vitória dos Iluminados</Text> : <Text style={styles.title}> Iluminados</Text>}

                <View style={{ width: "20%" }} />
                <View
                    style={styles.cabecalho}
                >
                    <Text style={{ color: "#fff", width: '7%', textAlign: "center", fontWeight: "bold" }}>K</Text>
                    <Text style={{ color: "#fff", width: '7%', textAlign: "center", fontWeight: "bold" }}>D</Text>
                    <Text style={{ color: "#fff", width: '7%', textAlign: "center", fontWeight: "bold" }}>A</Text>
                    <Text style={{ color: "#fff", width: '8%', textAlign: "center", fontWeight: "bold" }}>LH</Text>
                    <Text style={{ color: "#fff", width: '10%', textAlign: "center", fontWeight: "bold" }}>Den</Text>
                    <Text style={{ color: "#fff", width: '18%', textAlign: "center", fontWeight: "bold" }}>Dano H</Text>
                    <Text style={{ color: "#fff", width: '15%', textAlign: "center", fontWeight: "bold" }}>Dano T</Text>
                    <Text style={{ color: "#fff", width: '15%', textAlign: "center", fontWeight: "bold" }}>Cura</Text>
                    <Text style={{ color: "#fff", width: '15%', textAlign: "center", fontWeight: "bold" }}>Net</Text>
                </View>
                {radiant.map((player, index) => {

                    const hero = heroesList.find(hero => hero.id === player.hero_id);
                    const nome = hero?.name;

                    let imgSource =
                        PICTURE_HERO_BASE_URL + nome + ".png";

                    return (
                        <View key={index}
                            style={styles.radiantContainer}
                        >
                            <View
                                style={{ flexDirection: "row" }}
                            >
                                <Image
                                    style={styles.imageMedal}
                                    source={{
                                        uri: `${Medal(player.rank_tier)}`
                                    }}
                                />
                                <Image
                                    style={styles.imageHero}
                                    source={{
                                        uri: imgSource
                                    }}
                                />
                            </View>
                            <View
                                style={styles.infoContainer}
                            >
                                <Text style={styles.k}>{player.kills}</Text>
                                <Text style={styles.d}>{player.deaths}</Text>
                                <Text style={styles.a}>{player.assists}</Text>
                                <Text style={styles.lhs}>{player.last_hits}</Text>
                                <Text style={styles.denies}>{player.denies}</Text>
                                <Text style={styles.hDamage}>{player.hero_damage}</Text>
                                <Text style={styles.tDamage}>{player.tower_damage}</Text>
                                <Text style={styles.healing}>{player.hero_healing}</Text>
                                <Text style={styles.netWorth}>{player.net_worth}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        );
    };

    const renderItemTemidos = ({ item }: { item: MatchDetailsModel }) => {
        const radiant = item.players.slice(5, 10);

        return (
            <View
                style={{ alignItems: "center" }}
            >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>{item.dire_score}</Text>
                {!item.radiant_win ? <Text style={styles.title}>Vitória dos Temidos</Text> : <Text style={styles.title}> Temidos</Text>}


                <View style={{ width: "20%" }} />
                <View
                    style={styles.cabecalho}
                >
                    <Text style={{ color: "#fff", width: '7%', textAlign: "center", fontWeight: "bold" }}>K</Text>
                    <Text style={{ color: "#fff", width: '7%', textAlign: "center", fontWeight: "bold" }}>D</Text>
                    <Text style={{ color: "#fff", width: '7%', textAlign: "center", fontWeight: "bold" }}>A</Text>
                    <Text style={{ color: "#fff", width: '8%', textAlign: "center", fontWeight: "bold" }}>LH</Text>
                    <Text style={{ color: "#fff", width: '10%', textAlign: "center", fontWeight: "bold" }}>Den</Text>
                    <Text style={{ color: "#fff", width: '18%', textAlign: "center", fontWeight: "bold" }}>Dano H</Text>
                    <Text style={{ color: "#fff", width: '15%', textAlign: "center", fontWeight: "bold" }}>Dano T</Text>
                    <Text style={{ color: "#fff", width: '15%', textAlign: "center", fontWeight: "bold" }}>Cura</Text>
                    <Text style={{ color: "#fff", width: '15%', textAlign: "center", fontWeight: "bold" }}>Net</Text>
                </View>
                {radiant.map((player, index) => {

                    const hero = heroesList.find(hero => hero.id === player.hero_id);
                    const nome = hero?.name;

                    let imgSource =
                        PICTURE_HERO_BASE_URL + nome + ".png";

                    return (
                        <View key={index}
                            style={styles.radiantContainer}
                        >
                            <View
                                style={{ flexDirection: "row" }}
                            >
                                <Image
                                    style={styles.imageMedal}
                                    source={{
                                        uri: `${Medal(player.rank_tier)}`
                                    }}
                                />
                                <Image
                                    style={styles.imageHero}
                                    source={{
                                        uri: imgSource
                                    }}
                                />
                            </View>
                            <View
                                style={styles.infoContainer}
                            >
                                <Text style={styles.k}>{player.kills}</Text>
                                <Text style={styles.d}>{player.deaths}</Text>
                                <Text style={styles.a}>{player.assists}</Text>
                                <Text style={styles.lhs}>{player.last_hits}</Text>
                                <Text style={styles.denies}>{player.denies}</Text>
                                <Text style={styles.hDamage}>{player.hero_damage}</Text>
                                <Text style={styles.tDamage}>{player.tower_damage}</Text>
                                <Text style={styles.healing}>{player.hero_healing}</Text>
                                <Text style={styles.netWorth}>{player.net_worth}</Text>
                            </View>
                        </View>
                    )
                })}
            </View>
        );
    };





    return (
        <View style={styles.container}>

            <View
                style={(resultadoFinal == true) ? styles.modal : [styles.modal, { borderColor: "red" }]}
            >
                <View
                    style={styles.modalContent}>
                    <FlatList
                        data={matchDetails ? [matchDetails] : []}
                        renderItem={renderItemIluminados}
                        keyExtractor={(item) => item.match_id.toString()}
                    />
                    <FlatList
                        data={matchDetails ? [matchDetails] : []}
                        renderItem={renderItemTemidos}
                        keyExtractor={(item) => item.match_id.toString()}
                    />

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