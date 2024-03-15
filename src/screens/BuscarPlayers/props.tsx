export interface PlayerModel {
    profile: {
        account_id: number;
        personaname: string;
        avatarfull: string;
    }
};

export interface RecentMatches {
    match_id: number;
    radiant_win: boolean;
    hero_id: number;
    start_time: number;
    duration: number;
    kills: number;
    deaths: number;
    assists: number;
    last_hits: number;
    player_slot: number;
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
    players:
    [{
        account_id: number;
        win: number;
        lose: number;
        duration: number;
        hero_id: number,
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
    }]
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

