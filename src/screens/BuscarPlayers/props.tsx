export interface PlayerModel {
    profile: {
        account_id: number;
        personaname: string;
        avatarfull: string;
    },
    rank_tier: number;
    leaderboard_rank: null;
};

export interface RecentMatches {
    match_id: string;
    radiant_win: boolean;
    hero_id: number;
    start_time: number;
    duration: number;
    kills: number;
    deaths: number;
    assists: number;
    last_hits: number;
    player_slot: number;
    xp_per_min: number;
    gold_per_min: number;
    hero_damage: number;
    tower_damage: number;
    hero_healing: number;
    lobby_type: number;
}

export interface WL {
    player: {
        winCount: number;
        matchCount: number;
    }

}

export interface Heroes {
    id: number;
    name: string;
    localized_name: string;
    primaty_attr: string;
    attack_type: string;
    roles: [
        string, string, string
    ],

}

export interface MatchDetailsModel {
    players: Player[];
    radiant_win: boolean;
    duration: number;
    pre_game_duration: number;
    start_time: number;
    match_id: number;
    match_seq_num: number;
    tower_status_radiant: number;
    tower_status_dire: number;
    barracks_status_radiant: number;
    barracks_status_dire: number;
    cluster: number;
    first_blood_time: number;
    lobby_type: number;
    human_players: number;
    leagueid: number;
    game_mode: number;
    flags: number;
    engine: number;
    radiant_score: number;
    dire_score: number;
}

export interface Player {
    account_id: number;
    win: number;
    lose: number;
    duration: number;
    hero_id: number;
    start_time: number;
    kills: number;
    deaths: number;
    assists: number;
    last_hits: number;
    denies: number;
    gold_per_min: number;
    xp_per_min: number;
    level: number;
    net_worth: number;
    aghanims_scepter: number;
    aghanims_shard: number;
    hero_damage: number;
    tower_damage: number;
    hero_healing: number;
}


export interface PlayerDetails {
    match_id: number;
    account_id: number;
    win: number;
    lose: number;
    duration: number;
    start_time: number;
    hero_id: number;
    kills: number;
    deaths: number;
    assists: number;
    last_hits: number;
    denies: number;
    gold_per_min: number;
    xp_per_min: number;
    level: number;
    net_worth: number;
    aghanims_scepter: number;
    aghanims_shard: number;
    hero_damage: number;
    tower_damage: number;
    hero_healing: number;
}

