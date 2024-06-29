import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, FlatList, Modal, Keyboard } from 'react-native';
import { Hero, Heroes, PlayerHeroesPerformance, PlayerModel, RecentMatches } from './props';
import { HeroesList } from '../../components/Heroes/heroesList';
import { styles } from './styles';
import { PICTURE_HERO_BASE_URL, PLAYER_PROFILE_API_BASE_URL } from '../../constants/player';
import { Medal } from '../../components/Medals/MedalsList';
import loadingAnimation from '../../components/AnimatedButtons/loading.json'

import { ModalDestacarPartida } from '../../components/Modals/ModalDestacarPartida';
import { ModalDestacarHeroi } from '../../components/Modals/ModalDestacarHeroi';

import { useQuery } from '@apollo/client';
import { GET_PLAYER_DATA } from '../../graphql/queries';
import { MotiView } from 'moti';
import LottieView from 'lottie-react-native';
import { useKeyCounter } from '../../context/useKeyCounter';
import { usePlayerContext } from '../../context/useDatasContex';


export function BuscarPlayers({ navigation }: any) {

    const [searchId, setSearchId] = useState<string>('');
    const { playerId, setPlayerId } = usePlayerContext();
    const [player, setPlayer] = useState<PlayerModel | null>(null);
    const [recentMatches, setRecentMatches] = useState<RecentMatches[] | null>([]);
    const [heroId, setHeroId] = useState<number[]>([]);

    const [modalHeroVisible, setModalHeroVisible] = useState<boolean>(false);
    const [heroIndex, setHeroIndex] = useState<Heroes | undefined>(undefined);

    let vitorias = 0;
    let derrotas = 0;


    const playerIdLong = parseInt(playerId, 10);
    const [isLoading, setIsLoading] = useState(false);
    const [erroRequest, setErroRequest] = useState(false);
    const [erroMessage, setErroMessage] = useState('');
    const [firstEntry, setFirstEntry] = useState(true);

    const { data, loading, error } = useQuery(GET_PLAYER_DATA,
        { variables: { steamAccountId: playerIdLong } });


    const heroData: { displayName: string; id: number }[] = [];

    data?.player.heroesPerformance.forEach((item: PlayerHeroesPerformance) => {
        const { displayName, id } = item.hero;
        heroData.push({ displayName, id });
    });

    const { keyCounter, setKeyCounter, setHomeFocus, playerFocus, setPlayerFocus, setFriendsFocus } = useKeyCounter();

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
        setKeyCounter(keyCounter + 11);
        setHomeFocus(true);
        setFriendsFocus(true)
        setPlayerFocus(false);
        setTimeout(() => {
            navigation.goBack()
        }, 1200)
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
                const data: RecentMatches[] = await response.json();
                setRecentMatches(data);

                const heroIds: number[] = [...new Set(data.map(match => match.hero_id))];
                setHeroId(heroIds);
                console.log("Heróis Jogados", heroId);
            }
        } catch (error: any) {
            console.log('Erro na solicitaçãosss:' + error.message);
        }
        response.ok ? setErroRequest(false) : setErroRequest(true);

    };



    useEffect(() => {
        const searchPlayer = `${PLAYER_PROFILE_API_BASE_URL}${playerId}`;
        getSearchPlayer(searchPlayer);

        const recentMatches = `${PLAYER_PROFILE_API_BASE_URL}${playerId}/recentMatches`;
        getRecentMatches(recentMatches);
        setFirstEntry(false);

    }, [playerId])


    console.log(searchId)

    if (searchId.length == 9) {
        setPlayerId(searchId);
        Keyboard.dismiss();
        console.log(erroMessage);
        setSearchId("");
    }
    const calcularResultadoFinal = (item: RecentMatches): boolean => {
        const team = item.player_slot < 5 ? 1 : 2;
        const resultadoFinal = (team === 1 && item.radiant_win) || (team === 2 && !item.radiant_win);
        return resultadoFinal;
    };

    recentMatches?.forEach((item: RecentMatches) => {
        const resultadoFinal = calcularResultadoFinal(item);
        if (resultadoFinal) {
            vitorias++;
        } else {
            derrotas++;
        }
    });



    const winrate = ((vitorias / (vitorias + derrotas)) * 100).toFixed(2).toString().replace('.', ',');

    const renderItem = ({ item, index }: { item: RecentMatches, index: number }) => {

        const startDate = new Date(item.start_time * 1000);
        const durationInMinutes = item.duration;
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedDuration = `${formattedHours}:${formattedMinutes}`;

        const hoursDate = startDate.getHours();
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

        const hero = HeroesList.find(hero => hero.id === item.hero_id);
        let nomeHero = hero?.name || '';

        let imgSource =
            PICTURE_HERO_BASE_URL + nomeHero + ".png";


        return (
            <MotiView
                from={{ opacity: playerFocus ? 0 : 1 }}
                animate={{ opacity: playerFocus ? 1 : 0 }}
                transition={{ type: 'timing', duration: 1000 }}
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

    const renderItem2 = ({ item, index }: { item: number, index: number }) => {

        const hero = HeroesList.find(hero => hero.id === item);
        let nomeHero = hero?.name || '';

        let imgSource =
            PICTURE_HERO_BASE_URL + nomeHero + ".png";

        function updateHeroDetails() {
            const heroDetails = HeroesList.find(hero => hero.id === item);
            if (heroDetails) {
                setHeroIndex(heroDetails);

            }
        };

        return (
            <TouchableOpacity
                style={{ margin: 1 }}
                onPress={() => { updateHeroDetails(); setModalHeroVisible(true); }}

            >
                <Image
                    style={styles.imgHero}
                    source={{
                        uri: imgSource
                    }}
                    key={index.toString()}
                />
            </TouchableOpacity>
        );
    };


    return (
        <View style={styles.container}>
            <  MotiView
                key={keyCounter + 900}
                from={{ opacity: playerFocus ? 0 : 1 }}
                animate={{ opacity: playerFocus ? 1 : 0 }}
                transition={{ duration: 1200 }}
                style={{ alignItems: 'center', position: 'absolute' }}
            >
                <Image
                    style={{ opacity: 0.7 }}
                    source={require('../../images/player.jpg')}
                />
            </MotiView>
            <View
                style={styles.inputContainer}
            >
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder='Digite o ID do jogador'
                    onChangeText={(text) => setSearchId(text)}
                    value={searchId}
                />
            </View>

            {isLoading && <LottieView
                source={loadingAnimation}
                loop={true}
                autoPlay={true}
                style={{ top: 100, alignSelf: 'center', width: 150, height: 100 }}
            />}
            {!isLoading && player && player.profile && player !== null && player !== undefined ? (
                <View>
                    < MotiView
                        from={{ opacity: playerFocus ? 0 : 1 }}
                        animate={{ opacity: playerFocus ? 1 : 0 }}
                        transition={{ type: 'timing', duration: 1300 }}
                    >
                        <Text style={[styles.nomeJogador, { fontSize: 30, color: "yellow" }]}>{player?.profile.personaname} </Text>
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
                                        source={{ uri: `${Medal(medalRank)}` }}
                                    />
                                    <Text style={styles.textRank}>{player?.leaderboard_rank}</Text>
                                    <View style={{ justifyContent: "center", width: "75%" }}>

                                        <Text style={styles.title}>Partidas: <Text style={{ color: "orange" }}>{data?.player.matchCount}</Text></Text>
                                        <Text style={styles.title}>Vitórias: <Text style={{ color: "orange" }}>{data?.player.winCount}</Text></Text>
                                        <Text style={styles.title}>Vitórias: <Text style={{ color: "orange" }}>{vitorias} <Text style={styles.title}>Derrotas:</Text> <Text style={{ color: 'orange' }}>{derrotas} <Text style={styles.title}>Winrate: </Text><Text style={{ color: 'orange' }}>{winrate ? `${winrate}%` : ""}</Text></Text></Text></Text>

                                        <View style={{ flexDirection: "row", justifyContent: "center" }}>

                                            <Text style={[styles.nomeJogador, { fontSize: 13, color: "#c9c9c9", fontWeight: 'bold' }]}>id: </Text>

                                            <Text style={[styles.nomeJogador, { fontSize: 13, color: "#c9c9c9", fontWeight: 'bold' }]}>{playerId}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.flatListHeroes}>Heróis Jogados</Text>
                            <FlatList
                                style={{ flexGrow: 0, maxWidth: '100%' }}
                                horizontal
                                data={heroId.slice(0, 10)}
                                renderItem={renderItem2}
                                keyExtractor={(item) => item.toString()} />
                            <FlatList
                                style={{ flexGrow: 0, maxWidth: '100%' }}
                                horizontal
                                data={heroId.slice(10, 20)}
                                renderItem={renderItem2}
                                keyExtractor={(item) => item.toString()} />
                        </View>
                    </MotiView>
                    < MotiView

                        style={styles.flatListContainer} >
                        <MotiView
                            key={keyCounter + 200}



                        ><View style={styles.listTitle}>
                                <Text style={[styles.textTitle, { width: "10%", fontWeight: 'bold', color: "#fffccc" }]}>Herói</Text>
                                <Text style={[styles.textTitle, { width: "40%", fontWeight: 'bold', color: "#fffccc" }]}>Data</Text>
                                <Text style={[styles.textTitle, { width: "17%", fontWeight: 'bold', color: "#fffccc" }]}>Modo</Text>
                                <Text style={[styles.textTitle, { width: "25%", fontWeight: 'bold', color: "#fffccc" }]}>Duração</Text>
                                <Text style={[styles.textTitle, { width: "5%", fontWeight: 'bold', color: "#fffccc" }]}>K</Text>
                                <Text style={[styles.textTitle, { width: "5%", fontWeight: 'bold', color: "#fffccc" }]}>D</Text>
                                <Text style={[styles.textTitle, { width: "5%", fontWeight: 'bold', color: "#fffccc" }]}>A</Text>
                            </View><FlatList
                                data={recentMatches}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.match_id.toString()} />
                        </MotiView>
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
                    </MotiView> : firstEntry ? <MotiView></MotiView> : <MotiView
                        key={keyCounter + 400}
                        from={{ opacity: playerFocus ? 0 : 1 }}
                        animate={{ opacity: playerFocus ? 1 : 0 }}
                        transition={{ duration: 900 }}
                        style={styles.carregandoContent}
                    ><Text
                        style={styles.carregando}
                    >ID não encontrado!</Text>

                    </MotiView>
            )}

            <MotiView
                style={{ marginTop: recentMatches?.length && firstEntry != null ? '0%' : '50%' }}
                key={keyCounter + 500}
                from={{ translateY: playerFocus ? 200 : 0, opacity: 1 }}
                animate={{ translateY: playerFocus ? 0 : 200, opacity: 1 }}
                transition={{ duration: 1500, type: 'timing' }}
            >
                <View
                    style={{ marginTop: heroId.length > 10 ? '-9%' : "0%" }}
                >
                    <TouchableOpacity
                        style={styles.buttonVoltar}
                        onPress={() => navToHome()}
                    >
                        <Text style={[styles.text, { color: "#fff" }]}>V</Text>
                        <Text style={styles.text}>oltar</Text>
                    </TouchableOpacity>
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
                    playerId={playerId.toString()}
                    data={matchIndex.data}
                    modo={matchIndex.modo}
                    hora={matchIndex.hora}
                    duracao={matchIndex.duracao}
                />
            </Modal>
            <Modal
                visible={modalHeroVisible}
                transparent={true}
                animationType='fade'
            >{heroIndex && (<ModalDestacarHeroi
                handleClose={() => setModalHeroVisible(false)}
                image={heroIndex.name}
                name={heroIndex.localized_name}
                primary_attr={heroIndex.primary_attr}
                attack_type={heroIndex.attack_type}
                roles={heroIndex.roles}
            />)}

            </Modal>
        </View>
    );
}
