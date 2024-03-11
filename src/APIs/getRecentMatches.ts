import axios from "axios";
import { PLAYER_PROFILE_API_BASE_URL } from "../constants/player";
import { RecentMatches } from "../screens/BuscarPlayers/props";


export const fetchGetRecentMatchesData = async (playerId: string) => {
    try {
        const apiRecentMatches = `${PLAYER_PROFILE_API_BASE_URL}${playerId}/recentMatches`;
        const response = await axios.get<RecentMatches[]>(apiRecentMatches);
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar dados da API Recent Matches: ", error)
    }
}