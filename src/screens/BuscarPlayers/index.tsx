import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, FlatList, StyleSheet } from 'react-native';
import { usePlayerContext } from '../../components/Context/useDatasContex';
import { Border } from '../../components/Border';
import { PlayerModel, RecentMatches } from './props';
import { fetchGetPlayerData } from '../../APIs/getPlayer';
import { fetchGetRecentMatchesData } from '../../APIs/getRecentMatches';
import { HeroesList } from '../../components/Heroes/heroesList';
import { styles } from './styles';
import { PICTURE_HERO_BASE_URL } from '../../constants/player';


export function BuscarPlayers({ navigation }: any) {

    const { playerData, setPlayerData, recentMatches, setRecentMatches, playerId, setPlayerId, idAtual, setIdAtual } = usePlayerContext();

    /*   const [playerData, setPlayerData] = useState<PlayerModel | null>(null);
      const [recentMatches, setRecentMatches] = useState<RecentMatches[]>([]);
      const [playerId, setPlayerId] = useState(''); */
    const [novoId, setNovoId] = useState('')

    const heroesList = HeroesList();

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

        const team = item.player_slot < 5 ? 1 : 2

        const resultadoFinal = (team == 1 && item.radiant_win == true || team == 2 && item.radiant_win == false) ? "V" : "D"

        const hero = heroesList.find(hero => hero.id === item.hero_id);
        let nomeHero = hero?.name;

        let imgSource =
            PICTURE_HERO_BASE_URL + nomeHero + ".png";

        return (
            <View key={index} style={styles.listContainer}>
                <Image
                    style={{ width: 53, height: 30, resizeMode: "contain" }}
                    source={{
                        uri: imgSource
                    }}
                />
                <Text style={[resultadoFinal == "V" ? styles.textListV : styles.textListD, { width: "10%" }]}>{resultadoFinal}</Text>
                <Text style={[styles.textList, { width: "25%" }]}>
                    {startDate.toLocaleDateString('pt-BR')}
                </Text>
                <Text style={[styles.textList, { width: "20%" }]}>{formattedDuration}</Text>
                <Text style={[styles.textList, { color: "green", width: "7%" }]}>{item.kills}</Text>
                <Text style={[styles.textList, { color: "red", width: "7%" }]}>{item.deaths}</Text>
                <Text style={[styles.textList, { color: "yellow", width: "7%" }]}>{item.assists}</Text>
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
            <Border />
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
                    <View>
                        <Image
                            style={styles.image}
                            source={{
                                uri: playerData?.profile.avatarfull
                            }}
                            onError={(error) => console.error("Erro ao carregar a imgae: ", error)}
                        />
                    </View>
                    <View >
                        <Text style={[styles.nomeJogador, { fontSize: 15 }]}>ID: {playerId}</Text>
                        <Text style={styles.nomeJogador}>Nick: {playerData?.profile.personaname}</Text>

                    </View>

                </View>
                <View style={styles.flatListContainer}>
                    <View style={styles.listTitle}>
                        <Text style={[styles.textListV, { width: "15%", fontWeight: 'bold', color: "#fff" }]}>Herói</Text>
                        <Text style={[styles.textListV, { width: "36%", fontWeight: 'bold', color: "#fff" }]}>Data</Text>
                        <Text style={[styles.textListV, { width: "18%", fontWeight: 'bold', color: "#fff" }]}>Duração</Text>
                        <Text style={[styles.textListV, { width: "7%", fontWeight: 'bold', color: "#fff" }]}>K</Text>
                        <Text style={[styles.textListV, { width: "7%", fontWeight: 'bold', color: "#fff" }]}>D</Text>
                        <Text style={[styles.textListV, { width: "7%", fontWeight: 'bold', color: "#fff" }]}>A</Text>
                        <Text style={[styles.textListV, { width: "13%", fontWeight: 'bold', color: "#fff" }]}>LH's</Text>
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
                <Text style={styles.text}>Voltar</Text>
            </TouchableOpacity>

        </View>

    );
}
