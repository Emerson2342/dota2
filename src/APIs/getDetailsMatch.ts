import axios from "axios";
import { MATCHE_DETAILS_API_BASE_URL } from "../constants/player";
import { MatchDetailsModel } from "../screens/BuscarPlayers/props";


export const fetchGetMatchDetailsData = async (matchId: string) => {
    try {
        const apiRecentMatches = `${MATCHE_DETAILS_API_BASE_URL}+${matchId}`;
        const response = await axios.get<MatchDetailsModel | null>(apiRecentMatches);
        return response.data;
    } catch (error) {
        console.log("Erro ao buscar dados da API Recent Matches: ", error)
    }
}