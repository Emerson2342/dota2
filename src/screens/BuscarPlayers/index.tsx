import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, FlatList, Modal } from 'react-native';
import { usePlayerContext } from '../../components/Context/useDatasContex';
import { RecentMatches } from './props';
import { fetchGetPlayerData } from '../../APIs/getPlayer';
import { fetchGetRecentMatchesData } from '../../APIs/getRecentMatches';
import { HeroesList } from '../../components/Heroes/heroesList';
import { styles } from './styles';
import { PICTURE_HERO_BASE_URL } from '../../constants/player';
import { Medal } from '../../components/Medals/MedalsList';

import { ModalDestacarPartida } from '../../components/Modals/ModalDestacarPartida';

import { useQuery } from '@apollo/client';
import { GET_PLAYER_DATA } from '../../graphql/queries';

export function BuscarPlayers({ navigation }: any) {




    const { winrate, setWinrate, playerData, setPlayerData, recentMatches, setRecentMatches, playerId, setPlayerId, idAtual, setIdAtual } = usePlayerContext();


    const playerIdLong = parseInt(idAtual, 10);
    const { data, loading, error } = useQuery(GET_PLAYER_DATA,
        { variables: { steamAccountId: playerIdLong } });
    const [novoId, setNovoId] = useState('')
    const heroesList = HeroesList();
    const medalRank = playerData?.rank_tier;
    const [modalVisible, setModalVisible] = useState(false);
    const [matchIndex, setMatchIndex] = useState({
        id: 0,
        data: '',
        modo: '',
        heroi: 0,
        kills: 0,
        deaths: 0,
        assists: 0,
        xp: 0,
        gold: 0,
        heroDamage: 0,
        towerDamage: 0,
        lhs: 0,
        resultadoFinal: true

    })


    function navToHome() {
        navigation.navigate("home")
    }
    const handleBuscar = async () => {
        try {
            const playerDataResponse = await fetchGetPlayerData(idAtual);
            const playerData = playerDataResponse ?? null;
            setPlayerData(playerData);

            const recentMatchesDataResponse = await fetchGetRecentMatchesData(idAtual);
            const recentMatchesData = recentMatchesDataResponse ?? [];
            setRecentMatches(recentMatchesData);
            setWinrate(data)


        } catch (error) {
            console.error(`Erro ao buscar dados: `, error);
        }
    };
    console.log(JSON.stringify(winrate, null, 2))


    const renderItem = ({ item, index }: { item: RecentMatches, index: number }) => {

        const startDate = new Date(item.start_time * 1000);
        const durationInMinutes = item.duration;
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedDuration = `${formattedHours}:${formattedMinutes}`;

        const hoursDate = startDate.getHours() - 3;
        const minutesDate = startDate.getMinutes();

        const formattedTime = `${hoursDate.toString().padStart(2, '0')}:${minutesDate.toString().padStart(2, '0')}`;

        const lobbyType = {
            0: "Casual",
            1: 'Practice',
            2: 'Torneio',
            3: "Tutorial",
            4: "Com Bots",
            5: "Team Match",
            6: "Solo Queue",
            7: "Ranked",
            9: "Solo Mid"
        }

        const team = item.player_slot < 5 ? 1 : 2

        const resultadoFinal = (team == 1 && item.radiant_win == true || team == 2 && item.radiant_win == false) ? true : false

        const hero = heroesList.find(hero => hero.id === item.hero_id);
        let nomeHero = hero?.name;

        let imgSource =
            PICTURE_HERO_BASE_URL + nomeHero + ".png";

        return (
            <TouchableOpacity
                onPress={() => {
                    setMatchIndex({
                        id: item.match_id,
                        data: startDate.toLocaleDateString('pt-BR'),
                        modo: lobbyType[item.lobby_type as keyof typeof lobbyType],
                        heroi: item.hero_id,
                        kills: item.kills,
                        deaths: item.deaths,
                        assists: item.assists,
                        xp: item.xp_per_min,
                        gold: item.gold_per_min,
                        heroDamage: item.hero_damage,
                        towerDamage: item.tower_damage,
                        lhs: item.last_hits,
                        resultadoFinal: resultadoFinal
                    });
                    setModalVisible(true)
                }}
                key={index}
                style={styles.listContainer}
            >
                <Image
                    style={resultadoFinal ? styles.imageHero : [styles.imageHero, styles.imageHeroD]}
                    source={{
                        uri: imgSource
                    }}
                />
                <Text style={[styles.textList, { width: "35%" }]}>
                    {startDate.toLocaleDateString('pt-BR')}-{formattedTime}
                </Text>
                <Text style={[styles.textList, { color: "orange", width: "15%" }]}>{lobbyType[item.lobby_type as keyof typeof lobbyType]}</Text>
                <Text style={[styles.textList, { width: "20%" }]}>{formattedDuration}</Text>
                <Text style={[styles.textList, { color: "green", width: "5%" }]}>{item.kills}</Text>
                <Text style={[styles.textList, { color: "red", width: "5%" }]}>{item.deaths}</Text>
                <Text style={[styles.textList, { color: "yellow", width: "5%" }]}>{item.assists}</Text>
            </TouchableOpacity>
        );
    };

    const buscarId = () => {
        setIdAtual(novoId)
        setNovoId('')
        setPlayerId(idAtual)
        handleBuscar();
        console.log("Player ID:", playerId)
        console.log("Id Atual:", idAtual)
        console.log("-------------------")
    }

    return (

        <View style={styles.container}>
            <Image
                style={{ position: 'absolute', opacity: 0.3 }}
                source={
                    require('../../images/playerWallpaper.webp')
                }
            />
            <View style={styles.inputContainer}>
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder='Digite o ID do jogador'
                    onChangeText={(text) => setIdAtual(text)}
                    value={idAtual}
                />

                <TouchableOpacity
                    onPress={() => buscarId()}
                    style={styles.buttonBuscar}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
            </View>
            <View
                style={styles.jogadorInfo}
            >
                <View style={styles.profile}>
                    <View
                        style={{ width: "30%", alignItems: "center" }}
                    >
                        <Image
                            style={styles.image}
                            source={{
                                uri: playerData?.profile.avatarfull
                            }}
                            onError={(error) => console.error("Erro ao carregar a imgae: ", error)}
                        />

                    </View>
                    <View
                        style={{ width: "60%" }}
                    >
                        <View
                            style={styles.medals}>
                            <Image
                                style={styles.imageMedal}
                                source={{
                                    uri: `${Medal(medalRank)}`
                                }}
                            />

                            <Text style={styles.textRank}>{playerData?.leaderboard_rank}</Text>
                            <View style={{ justifyContent: "center", width: "75%" }}>
                                <Text style={styles.nomeJogador}>{playerData?.profile.personaname} </Text>
                                <Text style={styles.nomeJogador}> Vitórias: {winrate?.player.winCount}</Text>
                                <Text style={styles.nomeJogador}> Partidas: {winrate?.player.matchCount}</Text>

                                <View style={{ flexDirection: "row", justifyContent: "center" }}>

                                    <Text style={[styles.nomeJogador, { fontSize: 15, color: "#999999" }]}>id: </Text>

                                    <Text style={[styles.nomeJogador, { fontSize: 15, color: "#999999" }]}>{playerId}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.flatListContainer}>
                    <View style={styles.listTitle}>
                        <Text style={[styles.textTitle, { width: "10%", fontWeight: 'bold', color: "#fff" }]}>Herói</Text>
                        <Text style={[styles.textTitle, { width: "40%", fontWeight: 'bold', color: "#fff" }]}>Data</Text>
                        <Text style={[styles.textTitle, { width: "17%", fontWeight: 'bold', color: "#fff" }]}>Modo</Text>
                        <Text style={[styles.textTitle, { width: "25%", fontWeight: 'bold', color: "#fff" }]}>Duração</Text>
                        <Text style={[styles.textTitle, { width: "5%", fontWeight: 'bold', color: "#fff" }]}>K</Text>
                        <Text style={[styles.textTitle, { width: "5%", fontWeight: 'bold', color: "#fff" }]}>D</Text>
                        <Text style={[styles.textTitle, { width: "5%", fontWeight: 'bold', color: "#fff" }]}>A</Text>
                    </View>
                    <FlatList
                        data={recentMatches}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.match_id.toString()}
                    />
                </View>
            </View>

            <TouchableOpacity
                onPress={() => navToHome()}
                style={styles.buttonVoltar}
            >
                <Text style={[styles.text, { color: "#000" }]}>Voltar</Text>
            </TouchableOpacity>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType='fade'
            >
                <ModalDestacarPartida
                    handleClose={() => setModalVisible(false)}
                    id={matchIndex.id}
                    data={matchIndex.data}
                    modo={matchIndex.modo}
                    heroi={matchIndex.heroi}
                    kills={matchIndex.kills}
                    deaths={matchIndex.deaths}
                    assists={matchIndex.assists}
                    xp={matchIndex.xp}
                    gold={matchIndex.gold}
                    heroDamage={matchIndex.heroDamage}
                    towerDamage={matchIndex.towerDamage}
                    lhs={matchIndex.lhs}
                    resultadoFinal={matchIndex.resultadoFinal}
                />
            </Modal>
        </View>

    );
}
