import axios from "axios";
import { HEROES_API_BASE_URL } from "../constants/player";
import { Heroes } from "../screens/BuscarPlayers/props";
import { fetchGetRecentMatchesData } from "./getRecentMatches";

export const fetchGetHeroesPlayedData = async (playerId: string) => {
    try {

        const apiHeroes = HEROES_API_BASE_URL;
        const responseHeroes = await axios.get<Heroes[]>(apiHeroes);
        const heroesList = responseHeroes.data;

        const recentMatches = await fetchGetRecentMatchesData(playerId);
        const idsDoRecentMatch = recentMatches?.map(match => match.hero_id);
        const heroesFiltrados = heroesList
            .filter(hero => idsDoRecentMatch?.includes(hero.id))
            .map(hero => ({
                ...hero,
                localized_name: hero.localized_name.toLowerCase().replace(/\s/g, '_'),
            }));

        return heroesFiltrados;


    } catch (error) {
        console.log("Erro ao buscar dados da API Heroes Played: ", error)
    }
}