import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import { styles } from './styles';
import { Border } from '../../components/Border';
import { Heroes, PlayerDetails, PlayerModel, PlayerModelWL, RecentMatches } from './props';
import { fetchGetPlayerData } from '../../APIs/getPlayer';
import { fetchGetRecentMatchesData } from '../../APIs/getRecentMatches';
import { fetchGetHeroesPlayedData } from '../../APIs/getHeroesPlayed';
import { fetchGetWinLosData } from '../../APIs/getWinLost';
import { fetchGetMatchDetailsData } from '../../APIs/get.MatchesDatails';


export function BuscarPlayers() {

    const [playerData, setPlayerData] = useState<PlayerModel | null>(null);
    const [playerWL, setPlayerWL] = useState<PlayerModelWL | null>(null);
    const [recentMatches, setRecentMatches] = useState<RecentMatches[]>([]);
    const [matchesDetails, setMatchesDetails] = useState<PlayerDetails[]>([]);
    const [heroes, setHeroes] = useState<Heroes[]>([])
    const [playerId, setPlayerId] = useState('');


    const handleBuscar = async (playerId: string) => {
        try {
            // Obtém dados do jogador
            const playerDataResponse = await fetchGetPlayerData(playerId);
            const playerData = playerDataResponse ?? null;
            setPlayerData(playerData);

            // Obtém dados de vitórias/derrotas
            const playerWLDataResponse = await fetchGetWinLosData(playerId);
            const playerWLData = playerWLDataResponse ?? null;
            setPlayerWL(playerWLData);

            // Obtém dados de partidas recentes
            const recentMatchesDataResponse = await fetchGetRecentMatchesData(playerId);
            const recentMatchesData = recentMatchesDataResponse ?? [];
            setRecentMatches(recentMatchesData);

            // Obtém dados de heróis jogados recentemente
            const heroesDataResponse = await fetchGetHeroesPlayedData(playerId);
            const heroesData = heroesDataResponse ?? [];
            setHeroes(heroesData);

            const detailsRecentMatchesDataResponse = await fetchGetMatchDetailsData(playerId);
            const detailsRecentMatches = detailsRecentMatchesDataResponse ?? []
            setMatchesDetails(detailsRecentMatches)

            // console.log(JSON.stringify(matchesDetails, null, 2))

        } catch (error) {
            console.error(`Erro ao buscar dados: `, error);
        }
    };
    const handleInputChange = (text: string) => {

        const valorNumerico = text.replace(/\D/g, '');
        setPlayerId(valorNumerico)
    }


    const renderItem = ({ item, index }: { item: RecentMatches; index: number }) => {

        const matchDetail = matchesDetails.find(detail => detail.match_id === item.match_id);



        // console.log('Match Detail:', matchDetail);

        let winStatus = null;
        if (matchDetail) {
            // Encontrou um matchDetail, então procure o win associado
            const matchAccount = matchDetail.account_id;
            const matchWin = matchDetail.win;

            // Faça a lógica para determinar se a partida foi uma vitória ou uma derrota
            winStatus = matchWin === 1 ? 'Vitória' : 'Derrota';
        }


        const startDate = new Date(item.start_time * 1000);
        const durationInMinutes = item.duration;
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedDuration = `${formattedHours}:${formattedMinutes}`;


        console.log('RenderItem:', item.match_id, "-", matchDetail?.match_id);

        const hero = heroes.find(hero => hero.id === item.hero_id);
        let nomeHero = hero?.localized_name;

        let imgSource =
            "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/" + nomeHero + ".png";

        return (
            <View key={index} style={styles.listContainer}>
                <Image
                    style={{ width: 53, height: 30, resizeMode: "contain" }}
                    source={{
                        uri: imgSource
                    }}
                />
                <Text style={[styles.textList, { width: "25%" }]}>
                    {startDate.toLocaleDateString('pt-BR')}
                </Text>
                <Text style={{ color: "#cece" }}>{winStatus}</Text>
                <Text style={[styles.textList, { width: "20%" }]}>{formattedDuration}</Text>
                <Text style={[styles.textList, { color: "green", width: "10%" }]}>{item.kills}</Text>
                <Text style={[styles.textList, { color: "red", width: "10%" }]}>{item.deaths}</Text>
                <Text style={[styles.textList, { color: "yellow", width: "10%" }]}>{item.assists}</Text>
                <Text style={[styles.textList, { color: "orange", width: "15%" }]}>{item.last_hits}</Text>

            </View>
        );
    };



    return (
        <View style={styles.container}>
            <Border />
            <View style={styles.inputContainer}>
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    placeholder='Digite o ID do jogador'
                    onChangeText={handleInputChange}
                    value={playerId}
                />

                <TouchableOpacity
                    onPress={() => handleBuscar(playerId)}
                    style={styles.buttonBuscar}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
            </View>
            <View
                style={styles.jogadorInfo}
            >
                <Text style={styles.nomeJogador}>{playerData?.profile.personaname}</Text>
                <Image
                    style={styles.image}
                    source={{
                        uri: playerData?.profile.avatarfull
                    }}
                    onError={(error) => console.error("Erro ao carregar a imgae: ", error)}
                />
                <View style={{ width: "90%", flexDirection: "row", justifyContent: "space-around" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text}>Vitórias: </Text>
                        <Text style={[styles.text, { color: "green" }]}>{playerWL?.win}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.text}>Derrotas: </Text>
                        <Text style={[styles.text, { color: "red" }]}>{playerWL?.lose}</Text>
                    </View>
                </View>
                <View style={styles.flatListContainer}>
                    <View style={styles.listTitle}>
                        <Text style={[styles.textList, { width: 60, fontWeight: 'bold' }]}>Herói</Text>
                        <Text style={[styles.textList, { width: "20%", fontWeight: 'bold' }]}>Data</Text>
                        <Text style={[styles.textList, { width: "20%", fontWeight: 'bold' }]}>Duração</Text>
                        <Text style={[styles.textList, { width: "10%", fontWeight: 'bold' }]}>K</Text>
                        <Text style={[styles.textList, { width: "10%", fontWeight: 'bold' }]}>D</Text>
                        <Text style={[styles.textList, { width: "10%", fontWeight: 'bold' }]}>A</Text>
                        <Text style={[styles.textList, { width: "13%", fontWeight: 'bold' }]}>LH's</Text>
                    </View>

                    <FlatList
                        data={recentMatches}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.match_id.toString()}
                    />


                </View>


            </View>
        </View>

    );
}