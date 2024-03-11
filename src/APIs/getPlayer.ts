import axios from "axios";
import { PlayerModel } from "../screens/BuscarPlayers/props";
import { PLAYER_PROFILE_API_BASE_URL } from "../constants/player";

export const fetchGetPlayerData = async (playerId: string) => {

    try {
        const apiPlayer = `${PLAYER_PROFILE_API_BASE_URL}${playerId}`;

        const responsePlayer = await axios.get<PlayerModel>(apiPlayer);
        return (responsePlayer.data);
    } catch (error) {
        console.log("Erro ao buscar dados da API Player: ", error)
    }

}