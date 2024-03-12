import axios from "axios";
import { MATCHE_DETAILS_API_BASE_URL } from "../constants/player";
import { MatchDetailsModel, PlayerDetails } from "../screens/BuscarPlayers/props";
import { fetchGetRecentMatchesData } from "./getRecentMatches";


export const fetchGetMatchDetailsData = async (playerId: string) => {
    try {
        const recentMatches = await fetchGetRecentMatchesData(playerId);
        const idsDoRecentMatch = recentMatches?.map(match => match.match_id) || [];

        const lista: PlayerDetails[] = [];

        for (let i = 0; i < idsDoRecentMatch.length; i++) {
            try {
                const apiFinalResultMatches = `${MATCHE_DETAILS_API_BASE_URL}${idsDoRecentMatch[i]}`;
                const response = await axios.get<MatchDetailsModel>(apiFinalResultMatches);

                const filteredDetails = response.data.players.map(playerData => ({
                    match_id: idsDoRecentMatch[i],
                    account_id: playerData.account_id,
                    win: playerData.win,
                    lose: playerData.lose,
                    duration: playerData.duration,
                    hero_id: playerData.hero_id,
                    start_time: playerData.start_time,
                    kills: playerData.kills,
                    deaths: playerData.deaths,
                    assists: playerData.assists,
                    last_hits: playerData.last_hits,
                    denies: playerData.denies,
                    gold_per_min: playerData.gold_per_min,
                    xp_per_min: playerData.xp_per_min,
                    level: playerData.level,
                    net_worth: playerData.net_worth,
                    aghanims_scepter: playerData.aghanims_scepter,
                    aghanims_shard: playerData.aghanims_shard,
                    hero_damage: playerData.hero_damage,
                    tower_damage: playerData.tower_damage,
                    hero_healing: playerData.hero_healing,
                }));

                lista.push(...filteredDetails);
            } catch (error) {
                console.log("Erro ao buscar dados da API Match Details: ", error);
            }
        }

        return lista;
    } catch (error) {
        console.log("Erro ao buscar dados da API Match Details: ", error);
    }
};