import { IColorObject } from "./Types"

export enum CARD_COLOR {
    single,
    guild,
    shard
}

export const GUILDS: IColorObject = {
    azorius: 'azorius',
    dimir: 'dimir',
    rakdos: 'rakdos',
    gruul: 'gruul',
    selesnya: 'selesnya',
    orzhov: 'orzhov',
    izzet: 'izzet',
    golgari: 'golgari',
    boros: 'boros',
    simic: 'simic'
}

export const SHARDS: IColorObject = {
    bant: 'bant',
    esper: 'esper',
    grixis: 'grixis',
    jund: 'jund',
    naya: 'naya'
}

export const CARD_COLORS: IColorObject = {
    white: 'w',
    blue: 'u',
    red: 'r',
    black: 'b',
    green: 'g',
    guild_colors: GUILDS,
    shard_colors: SHARDS,
    colorless: 'c',
    muilticolor: 'm'
}