export interface PlayerModel {
    profile: {
        account_id: number;
        personaname: string;
        avatarfull: string;
    }
};

export interface PlayerModelWL {
    win: number;
    lose: number;
}

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
}

export interface Heroes {
    hero_id: any;
    id: number;
    primaty_attr: string;
    attack_type: string;
    roles: [
        string, string, string
    ],
    localized_name: string;
}
