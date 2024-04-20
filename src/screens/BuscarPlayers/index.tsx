import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, FlatList, Modal } from 'react-native';
import { usePlayerContext } from '../../context/useDatasContex';
import { PlayerModel, RecentMatches, WL } from './props';
import { fetchGetPlayerData } from '../../APIs/getPlayer';
import { fetchGetRecentMatchesData } from '../../APIs/getRecentMatches';
import { HeroesList } from '../../components/Heroes/heroesList';
import { styles } from './styles';
import { PICTURE_HERO_BASE_URL, PLAYER_PROFILE_API_BASE_URL } from '../../constants/player';
import { Medal } from '../../components/Medals/MedalsList';
import loadingAnimation from '../../components/AnimatedButtons/loading.json'

import { ModalDestacarPartida } from '../../components/Modals/ModalDestacarPartida';

import { useQuery } from '@apollo/client';
import { GET_PLAYER_DATA } from '../../graphql/queries';
import { MotiView } from 'moti';
import LottieView from 'lottie-react-native';
import { useKeyCounter } from '../../context/useKeyCounter';

export function BuscarPlayers({ navigation }: any) {

    const [searchId, setSearchId] = useState('');
    const [playerId, setPlayerId] = useState('');
    const [player, setPlayer] = useState<PlayerModel | null>(null);
    const [recentMatches, setRecentMatches] = useState([]);
    const [winrate, setWinrate] = useState<WL | null>(null)
    const playerIdLong = parseInt(playerId, 10);
    const [isLoading, setIsLoading] = useState(false)

    const { data, loading, error } = useQuery(GET_PLAYER_DATA,
        { variables: { steamAccountId: playerIdLong } });

    const { keyCounter, setKeyCounter, setHomeFocus } = useKeyCounter();

    function resetAnimation() {
        setKeyCounter(keyCounter + 1);
        setHomeFocus(true);
    }

    const heroesList = HeroesList();

    const medalRank = player?.rank_tier;
    const [modalVisible, setModalVisible] = useState(false);
    const [matchIndex, setMatchIndex] = useState({
        id: '',
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
        resultadoFinal: true,
        duracao: '',
        hora: ''
    })


    function navToHome() {
        resetAnimation()
        navigation.goBack()
    }
    const getSearchPlayer = async (url: any) => {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setPlayer(data);
        setIsLoading(false)
    }

    const getRecentMatches = async (url: any) => {
        const response = await fetch(url);
        const data = await response.json();
        setRecentMatches(data)
    }
    useEffect(() => {
        const searchPlayer = `${PLAYER_PROFILE_API_BASE_URL}${playerId}`;
        getSearchPlayer(searchPlayer);

        const recentMatches = `${PLAYER_PROFILE_API_BASE_URL}${playerId}/recentMatches`;
        getRecentMatches(recentMatches);

        console.log(searchPlayer)
        console.log("ID:", playerId)
        console.log("últimas Partidas", recentMatches)

    }, [playerId])



    console.log("Player ID:", playerId)
    console.log(winrate?.player.matchCount)

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
            <MotiView
                from={{ translateX: 300, opacity: 1 }}
                animate={{ translateX: 0, opacity: 1 }}
                transition={{ type: 'timing', duration: 400 * index }}
            >
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
                            resultadoFinal: resultadoFinal,
                            duracao: formattedDuration,
                            hora: formattedTime
                        });
                        setModalVisible(true)
                    }}
                    key={index}
                    style={styles.listContainer}
                >
                    <Image
                        style={resultadoFinal ? styles.imageHero : ([styles.imageHero, { borderColor: 'rgb(255,0,0)' }])}
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
            </MotiView>
        );
    };

    const buscarId = () => {
        setPlayerId(searchId)
        setSearchId('')
    }

    return (
        <View style={styles.container}>
            <Image
                style={{ position: 'absolute', opacity: 0.9 }}
                source={
                    require('../../images/playerWallpaper.jpg')
                }
            />
            <View style={styles.inputContainer}>
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder='Digite o ID do jogador'
                    onChangeText={(text) => setSearchId(text)}
                    value={searchId}
                    onSubmitEditing={buscarId}
                />

                <TouchableOpacity
                    onPress={buscarId}
                    style={styles.buttonBuscar}>
                    <Text
                        style={styles.buscarText}
                    >Buscar</Text>
                </TouchableOpacity>
            </View>
            {isLoading && <LottieView
                source={loadingAnimation}
                loop={true}
                autoPlay={true}
                style={{ top: 300, alignSelf: 'center', width: 150, height: 100 }}
            />}
            {!isLoading && player && player.profile && player !== null && player !== undefined ? (
                <View
                    style={styles.jogadorInfo}
                >
                    < MotiView style={styles.profile}
                        from={{ translateY: -100, opacity: 1 }}
                        animate={{ translateY: 0, opacity: 1 }}
                        transition={{ type: 'spring', duration: 9000 }}
                    >
                        <View
                            style={{ width: "30%", alignItems: "center" }}
                        >
                            <Image
                                style={styles.image}
                                source={{
                                    uri: player?.profile.avatarfull
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

                                <Text style={styles.textRank}>{player?.leaderboard_rank}</Text>
                                <View style={{ justifyContent: "center", width: "75%" }}>
                                    <Text style={styles.nomeJogador}>{player?.profile.personaname} </Text>
                                    <Text style={styles.title}> Vitórias: {data?.player.winCount}</Text>
                                    <Text style={styles.title}> Partidas: {data?.player.matchCount}</Text>

                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>

                                        <Text style={[styles.nomeJogador, { fontSize: 13, color: "#999999" }]}>id: </Text>

                                        <Text style={[styles.nomeJogador, { fontSize: 13, color: "#999999" }]}>{playerId}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </MotiView>

                    <View style={styles.flatListContainer}>

                        {recentMatches ? (<><View style={styles.listTitle}>
                            <Text style={[styles.textTitle, { width: "10%", fontWeight: 'bold', color: "#fff" }]}>Herói</Text>
                            <Text style={[styles.textTitle, { width: "40%", fontWeight: 'bold', color: "#fff" }]}>Data</Text>
                            <Text style={[styles.textTitle, { width: "17%", fontWeight: 'bold', color: "#fff" }]}>Modo</Text>
                            <Text style={[styles.textTitle, { width: "25%", fontWeight: 'bold', color: "#fff" }]}>Duração</Text>
                            <Text style={[styles.textTitle, { width: "5%", fontWeight: 'bold', color: "#fff" }]}>K</Text>
                            <Text style={[styles.textTitle, { width: "5%", fontWeight: 'bold', color: "#fff" }]}>D</Text>
                            <Text style={[styles.textTitle, { width: "5%", fontWeight: 'bold', color: "#fff" }]}>A</Text>
                        </View><FlatList
                                data={recentMatches}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.match_id.toString()} /></>) :
                            (<View
                                style={styles.carregandoContent}
                            ><Text
                                style={styles.carregando}
                            >Erro ao carregar as últimas partidas!</Text></View>)}
                    </View>
                </View>) : (!isLoading ?
                    <Text
                        style={styles.textTitle}
                    >Favor digitar um ID válido</Text> : <></>
            )}

            <View
                style={{ flex: 1, width: '85%', marginBottom: 20, justifyContent: 'flex-end' }}
            >
                <TouchableOpacity
                    style={styles.buttonVoltar}
                    onPress={() => navToHome()}
                >
                    <Text style={styles.text}>Voltar</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType='fade'
            >
                <ModalDestacarPartida
                    handleClose={() => setModalVisible(false)}
                    id={matchIndex.id}
                    resultadoFinal={matchIndex.resultadoFinal}
                    playerId={playerId.toString()}

                />
            </Modal>
        </View>
    );
}
