import axios from "axios";
import { PlayerModelWL } from "../screens/BuscarPlayers/props";
import { PLAYER_PROFILE_API_BASE_URL } from "../constants/player";


export const fetchGetWinLosData = async (playerId: string) => {
    try {
        const apiWL = `${PLAYER_PROFILE_API_BASE_URL}${playerId}/wl`;
        const responseWL = await axios.get<PlayerModelWL>(apiWL);
        return responseWL.data;
    } catch (error) {
        console.log("Erro ao buscar dados da API Win Los: ", error)
    }
}