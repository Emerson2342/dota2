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

export function BuscarPlayers({ navigation }: any) {

    const { playerData, setPlayerData, recentMatches, setRecentMatches, playerId, setPlayerId, idAtual, setIdAtual } = usePlayerContext();
    const [novoId, setNovoId] = useState('')
    const heroesList = HeroesList();
    const medalRank = playerData?.rank_tier;
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


        } catch (error) {
            console.error(`Erro ao buscar dados: `, error);
        }
    };

    const renderItem = ({ item, index }: { item: RecentMatches; index: number }) => {

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


        const team = item.player_slot < 5 ? 1 : 2

        const resultadoFinal = (team == 1 && item.radiant_win == true || team == 2 && item.radiant_win == false) ? true : false

        const hero = heroesList.find(hero => hero.id === item.hero_id);
        let nomeHero = hero?.name;

        let imgSource =
            PICTURE_HERO_BASE_URL + nomeHero + ".png";

        return (
            <View key={index}
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
                <Text style={[styles.textList, { width: "20%" }]}>{formattedDuration}</Text>
                <Text style={[styles.textList, { color: "green", width: "5%" }]}>{item.kills}</Text>
                <Text style={[styles.textList, { color: "red", width: "5%" }]}>{item.deaths}</Text>
                <Text style={[styles.textList, { color: "yellow", width: "5%" }]}>{item.assists}</Text>
                <Text style={[styles.textList, { color: "orange", width: "15%" }]}>{item.last_hits}</Text>
            </View>
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
                        <Text style={[styles.textTitle, { width: "18%", fontWeight: 'bold', color: "#fff" }]}>Duração</Text>
                        <Text style={[styles.textTitle, { width: "5%", fontWeight: 'bold', color: "#fff" }]}>K</Text>
                        <Text style={[styles.textTitle, { width: "5%", fontWeight: 'bold', color: "#fff" }]}>D</Text>
                        <Text style={[styles.textTitle, { width: "5%", fontWeight: 'bold', color: "#fff" }]}>A</Text>
                        <Text style={[styles.textTitle, { width: "13%", fontWeight: 'bold', color: "#fff" }]}>LH's</Text>
                    </View>

                    <FlatList
                        data={recentMatches}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.match_id.toString()}
                    />

                </View>
            </View>

            <TouchableOpacity
                onPress={navToHome}
                style={styles.buttonVoltar}
            >
                <Text style={[styles.text, { color: "#000" }]}>Voltar</Text>
            </TouchableOpacity>
            <Modal
                visible={false}
                transparent={true}
                animationType='fade'
            >
                <ModalDestacarPartida
                />
            </Modal>
        </View>

    );
}
