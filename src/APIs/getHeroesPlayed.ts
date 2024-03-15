import axios from "axios";
import { HEROES_API_BASE_URL } from "../constants/player";
import { Heroes } from "../screens/BuscarPlayers/props";

export const fetchGetHeroesPlayedData = async () => {
    try {

        const apiHeroes = HEROES_API_BASE_URL;
        const responseHeroes = await axios.get<Heroes[]>(apiHeroes);
        return responseHeroes.data;

    } catch (error) {
        console.log("Erro ao buscar dados da API Heroes Played: ", error)
    }
}