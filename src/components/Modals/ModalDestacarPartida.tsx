import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Platform } from 'react-native';

import { styles } from './ModalDestacarPartidaStyles';
import { HeroesList } from '../Heroes/heroesList';
import { MatchDetailsModel } from '../../screens/BuscarPlayers/props';
import { fetchGetMatchDetailsData } from '../../APIs/getDetailsMatch';
import { PICTURE_HERO_BASE_URL } from '../../constants/player';
import { Medal } from '../Medals/MedalsList';
import LottieView from 'lottie-react-native';
import loadingAnimation from '../AnimatedButtons/loading.json'
import { MotiView } from 'moti';
import { useKeyCounter } from '../../context/useKeyCounter';
const heroesList = HeroesList();

export function ModalDestacarPartida(
    {
        handleClose, id, resultadoFinal, playerId }:
        {
            handleClose(): void, id: string, resultadoFinal: boolean, playerId: string

        }) {


    const { keyCounter, setKeyCounter, homeFocus, setHomeFocus, playerFocus, setPlayerFocus } = useKeyCounter();

    const [matchDetails, setMatchDetails] = useState<MatchDetailsModel | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchData() {
            try {
                const recentMatchesDataResponse = await fetchGetMatchDetailsData(id);
                setMatchDetails(recentMatchesDataResponse ?? null);
            } catch (error) {
                console.error('Erro ao buscar detalhes da partida:', error);
            } finally {
                setLoading(false);
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
                <Text style={{ color: "green", fontWeight: "bold" }}>{item.radiant_score}</Text>

                {item.radiant_win ? <Text style={[styles.title, { color: "green" }]}>Vitória dos Iluminados</Text> : <Text style={[styles.title, { color: "green" }]}> Iluminados</Text>}


                <View style={{ width: "20%" }} />
                <View
                    style={styles.cabecalho}
                >
                    <Text style={[styles.cabecalhoText, { width: '7%' }]}>K</Text>
                    <Text style={[styles.cabecalhoText, { width: '7%' }]}>D</Text>
                    <Text style={[styles.cabecalhoText, { width: '7%' }]}>A</Text>
                    <Text style={[styles.cabecalhoText, { width: '8%' }]}>LH</Text>
                    <Text style={[styles.cabecalhoText, { width: '10%' }]}>Den</Text>
                    <Text style={[styles.cabecalhoText, { width: '18%' }]}>Dano Heróis</Text>
                    <Text style={[styles.cabecalhoText, { width: '15%' }]}>Dano Torres</Text>
                    <Text style={[styles.cabecalhoText, { width: '15%' }]}>Cura</Text>
                    <Text style={[styles.cabecalhoText, { width: '15%' }]}>Net Worth</Text>
                </View>
                {radiant.map((player, index) => {

                    const hero = heroesList.find(hero => hero.id === player.hero_id);
                    const nome = hero?.name;

                    let imgSource =
                        PICTURE_HERO_BASE_URL + nome + ".png";

                    return (
                        <View
                            key={index}
                            style={
                                (playerId && player.account_id && playerId === player.account_id.toString()) ?
                                    [styles.radiantContainer, { backgroundColor: "rgba(0,0,250,0.7)" }] :
                                    styles.radiantContainer
                            }
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
                <Text style={{ color: "red", fontWeight: "bold" }}>{item.dire_score}</Text>
                {!item.radiant_win ? <Text style={[styles.title, { color: "red" }]}>Vitória dos Temidos</Text> : <Text style={[styles.title, { color: "red" }]}> Temidos</Text>}


                <View style={{ width: "20%" }} />
                <View
                    style={styles.cabecalho}
                >
                    <Text style={[styles.cabecalhoText, { width: '7%' }]}>K</Text>
                    <Text style={[styles.cabecalhoText, { width: '7%' }]}>D</Text>
                    <Text style={[styles.cabecalhoText, { width: '7%' }]}>A</Text>
                    <Text style={[styles.cabecalhoText, { width: '8%' }]}>LH</Text>
                    <Text style={[styles.cabecalhoText, { width: '10%' }]}>Den</Text>
                    <Text style={[styles.cabecalhoText, { width: '18%' }]}>Dano Heróis</Text>
                    <Text style={[styles.cabecalhoText, { width: '15%' }]}>Dano Torres</Text>
                    <Text style={[styles.cabecalhoText, { width: '15%' }]}>Cura</Text>
                    <Text style={[styles.cabecalhoText, { width: '15%' }]}>Net Worth</Text>
                </View>
                {radiant.map((player, index) => {

                    const hero = heroesList.find(hero => hero.id === player.hero_id);
                    const nome = hero?.name;

                    let imgSource =
                        PICTURE_HERO_BASE_URL + nome + ".png";

                    return (
                        <View
                            key={index}
                            style={
                                (playerId && player.account_id && playerId === player.account_id.toString()) ?
                                    [styles.radiantContainer, { backgroundColor: "rgba(0,0,250,0.7)" }] :
                                    styles.radiantContainer
                            }
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
            {loading ? (<View
                style={styles.carregandoContent}
            >
                <LottieView
                    source={loadingAnimation}
                    loop={true}
                    autoPlay={true}
                    style={{ alignSelf: 'center', width: 90, height: 90 }}
                />

                <TouchableOpacity
                    onPress={() => handleClose()}
                    style={styles.buttonModal}>
                    <Text
                        style={styles.textButtonModal}
                    >Cancelar</Text>
                </TouchableOpacity>
            </View>) : (
                matchDetails ? (<View
                >
                    <MotiView
                        key={keyCounter}
                        from={{ translateX: -200, opacity: 1 }}
                        animate={{ translateX: 0, opacity: 1 }}
                        transition={{ type: 'spring', duration: 9000 }}
                        style={styles.modalIluminados}
                    >
                        <FlatList
                            data={matchDetails ? [matchDetails] : []}
                            renderItem={renderItemIluminados}
                            keyExtractor={(item) => item.match_id.toString()}
                        />
                    </MotiView>
                    <MotiView
                        key={keyCounter + 150}
                        from={{ translateX: 200, opacity: 1 }}
                        animate={{ translateX: 0, opacity: 1 }}
                        transition={{ type: 'spring', duration: 9000 }}
                        style={styles.modalTemidos}
                    >
                        <FlatList
                            data={matchDetails ? [matchDetails] : []}
                            renderItem={renderItemTemidos}
                            keyExtractor={(item) => item.match_id.toString()}
                        />
                    </MotiView>
                    <View

                    >
                        <TouchableOpacity
                            onPress={() => handleClose()}
                            style={styles.buttonFechar}>
                            <Text
                                style={[styles.textButton, { color: "#fff" }]}
                            >F</Text><Text
                                style={styles.textButton}
                            >echar</Text>
                        </TouchableOpacity>
                    </View>
                </View>) : (
                    <View
                        style={styles.carregandoContent}
                    >
                        <Text
                            style={styles.carregando}
                        >Erro ao carregar dados da partida!</Text>
                        <TouchableOpacity
                            onPress={() => handleClose()}
                            style={styles.buttonModal}>
                            <Text
                                style={styles.textButtonModal}
                            >Fechar</Text>
                        </TouchableOpacity>
                    </View>
                )
            )
            }
        </View >
    );
}