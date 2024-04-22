import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, FlatList, Modal, Keyboard } from 'react-native';
import { PlayerModel, RecentMatches } from './props';
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

    const playerIdLong = parseInt(playerId, 10);
    const [isLoading, setIsLoading] = useState(false);
    const [erroRequest, setErroRequest] = useState(false);
    const [erroMessage, setErroMessage] = useState('');
    const [firstEntry, setFirstEntry] = useState(true);

    const { data, loading, error } = useQuery(GET_PLAYER_DATA,
        { variables: { steamAccountId: playerIdLong } });

    const { keyCounter, setKeyCounter, setHomeFocus, playerFocus, setPlayerFocus } = useKeyCounter();

    function resetAnimation() {
        setKeyCounter(keyCounter + 1);
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
        setHomeFocus(true);
        setPlayerFocus(false);
        setTimeout(() => {
            navigation.goBack()
        }, 1500)
    }
    const getSearchPlayer = async (url: any) => {
        setIsLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        setPlayer(data);
        setIsLoading(false);
    }

    const getRecentMatches = async (url: any) => {
        const response = await fetch(url);
        response.ok ? setErroRequest(false) : setErroRequest(true);
        try {

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Erro Mensagem: ", errorData);
                if (errorData.error == "invalid account id") {
                    setErroMessage("Conta da Steam inválida");
                }
                if (errorData.error == "Internal Server Error") {
                    setErroMessage("Erro interno do servidor");
                }

                throw new Error('Erro ao carregar os dados: ' + response.statusText);
            } else {
                const data = await response.json();
                setRecentMatches(data);
            }
        } catch (error: any) {
            console.log('Erro na solicitaçãosss:' + error.message);
        }
        response.ok ? setErroRequest(false) : setErroRequest(true);
    };

    console.log("Erro na Solicitação: ", erroRequest);

    const buscarId = () => {
        setPlayerId(searchId);
        setSearchId('');
        Keyboard.dismiss();
        console.log(erroMessage);
        const searchPlayer = `${PLAYER_PROFILE_API_BASE_URL}${searchId}`;
        getSearchPlayer(searchPlayer);

        const recentMatches = `${PLAYER_PROFILE_API_BASE_URL}${searchId}/recentMatches`;
        getRecentMatches(recentMatches);
        setFirstEntry(false);
    }


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
                from={{ translateX: playerFocus ? 300 : 0, opacity: playerFocus ? 0 : 1 }}
                animate={{ translateX: playerFocus ? 0 : 400, opacity: playerFocus ? 1 : 0 }}
                transition={{ type: 'timing', duration: 1 * (500 * (index * 0.5)) }}
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



    return (
        <View style={styles.container}>
            <  MotiView
                key={keyCounter + 900}
                from={{ opacity: playerFocus ? 0 : 1 }}
                animate={{ opacity: playerFocus ? 1 : 0 }}
                transition={{ duration: 1300 }}
                style={{ alignItems: 'center', position: 'absolute' }}
            >
                <Image
                    source={
                        require('../../images/player.jpg')
                    }
                />
            </MotiView>

            <MotiView
                style={styles.topContainer}
                key={keyCounter}
                from={{ translateY: playerFocus ? -200 : 0, opacity: 1 }}
                animate={{ translateY: playerFocus ? 0 : -200, opacity: 1 }}
                transition={{ type: 'spring', duration: 7000 }}
            >
                <View
                    style={styles.titleContainer}
                >
                    <Text
                        style={[styles.titleText, { color: "#fff" }]}>
                        E
                    </Text>
                    <Text
                        style={styles.titleText}>
                        statísticas do jogador
                    </Text>
                </View>
                <View
                    style={styles.inputContainer}
                >

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
                            style={[styles.buscarText, { color: "#fff" }]}
                        >B</Text>
                        <Text
                            style={styles.buscarText}
                        >uscar</Text>
                    </TouchableOpacity>
                </View>
            </MotiView>
            {isLoading && <LottieView
                source={loadingAnimation}
                loop={true}
                autoPlay={true}
                style={{ top: 100, alignSelf: 'center', width: 150, height: 100 }}
            />}
            {!isLoading && player && player.profile && player !== null && player !== undefined ? (
                <View>
                    < MotiView
                        from={{ translateY: playerFocus ? -100 : 0, opacity: 1 }}
                        animate={{ translateY: playerFocus ? 0 : -300, opacity: 1 }}
                        transition={{ type: 'spring', duration: 7000 }}
                    >
                        <View
                            style={styles.profile}
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
                        </View>
                    </MotiView>
                    < MotiView
                        key={keyCounter + 400}
                        from={{ opacity: playerFocus ? 0 : 1 }}
                        animate={{ opacity: playerFocus ? 1 : 0 }}
                        transition={{ duration: 900 }}
                        style={styles.flatListContainer} >
                        {erroRequest ? (<View
                            style={styles.carregandoContent}
                        ><Text
                            style={styles.carregando}
                        >Erro ao carregar os dados: </Text>
                            <Text
                                style={styles.carregando}
                            >{erroMessage}</Text></View>) :
                            (<  MotiView
                                key={keyCounter + 200}
                                from={{ opacity: playerFocus ? 0 : 1 }}
                                animate={{ opacity: playerFocus ? 1 : 0 }}
                                transition={{ duration: 900 }}

                            ><View style={styles.listTitle}>
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
                                    keyExtractor={(item) => item.match_id.toString()} />
                            </MotiView>)
                        }
                    </MotiView>
                </View>) : (isLoading ?
                    <View
                        style={[styles.carregandoContent, { marginTop: 150 }]}
                    ><Text
                        style={styles.carregando}
                    >Carregando...</Text></View> : erroRequest ? <MotiView
                        key={keyCounter + 400}
                        from={{ opacity: playerFocus ? 0 : 1 }}
                        animate={{ opacity: playerFocus ? 1 : 0 }}
                        transition={{ duration: 900 }}
                        style={styles.carregandoContent}
                    ><Text
                        style={styles.carregando}
                    >Erro ao carregar dados:</Text>
                        <Text
                            style={styles.carregando}
                        >{erroMessage}</Text>
                    </MotiView> : firstEntry ? <MotiView
                        key={keyCounter + 400}
                        from={{ opacity: playerFocus ? 0 : 1 }}
                        animate={{ opacity: playerFocus ? 1 : 0 }}
                        transition={{ duration: 900 }}
                        style={styles.carregandoContent}
                    ><Text
                        style={styles.carregando}
                    >Favor digitar ID válido!</Text></MotiView> : <MotiView
                        key={keyCounter + 400}
                        from={{ opacity: playerFocus ? 0 : 1 }}
                        animate={{ opacity: playerFocus ? 1 : 0 }}
                        transition={{ duration: 900 }}
                        style={styles.carregandoContent}
                    ><Text
                        style={styles.carregando}
                    >ID não encontrado!</Text></MotiView>
            )}

            <MotiView
                style={recentMatches.length == null ||
                    recentMatches.length == 0 || erroRequest ? [styles.correnteContainer, { marginTop: 450 }] : styles.correnteContainer}
                key={keyCounter + 500}
                from={{ translateY: playerFocus ? 300 : 0, opacity: 1 }}
                animate={{ translateY: playerFocus ? 0 : 300, opacity: 1 }}
                transition={{ type: 'spring', duration: 9000 }}
            >
                <View>
                    <Image
                        style={{ resizeMode: 'contain' }}
                        source={
                            require('../../images/correnteH.png')
                        }
                    />
                </View>
                <View
                    style={recentMatches.length == null ||
                        recentMatches.length == 0 || erroRequest ? [styles.bottomContainer] : styles.bottomContainer}
                >


                    <TouchableOpacity
                        style={styles.buttonVoltar}
                        onPress={() => navToHome()}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>V</Text>
                        <Text style={styles.text}>oltar</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    <Image
                        style={{ resizeMode: 'contain' }}
                        source={
                            require('../../images/correnteH.png')
                        }
                    />
                </View>
            </MotiView>
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
