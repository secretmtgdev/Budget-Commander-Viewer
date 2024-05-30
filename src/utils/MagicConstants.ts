import { ClientLib } from "./Types"

export enum CARD_COLOR {
    single,
    guild,
    shard
}

export const SINGLE_COLOR: ClientLib.IColorSet = {
    white: {
        name: 'white',
        color: 'w'
    },
    blue: {
        name: 'blue',
        color: 'u'
    },
    red: {
        name: 'red',
        color: 'r'
    },
    black: {
        name: 'black',
        color: 'b'
    },
    green: {
        name: 'green',
        color: 'g'
    }
}

export const GUILDS: ClientLib.IColorSet = {
    azorius: {
        name: 'azorius',
        color: 'wu'
    },        
    dimir: {
        name: 'dimir',
        color: 'ub'
    },
    rakdos: {
        name: 'rakdos',
        color: 'br'
    },
    gruul: {
        name: 'gruul',
        color: 'rg'
    },
    selesnya: {
        name: 'selesnya',
        color: 'wg'
    },
    orzhov: {
        name: 'orzhov',
        color: 'wb'
    },
    izzet: {
        name: 'izzet',
        color: 'ur'
    },
    golgari: {
        name: 'golgari',
        color: 'bg'
    },
    boros: {
        name: 'boros',
        color: 'wr'
    },
    simic: {
        name: 'simic',
        color: 'ug'
    }
}

export const SHARDS: ClientLib.IColorSet = {
    bant: {
        name: 'bant',
        color: 'wug'
    },
    esper: {
        name: 'esper',
        color: 'wub'
    },
    grixis: {
        name: 'grixis',
        color: 'ubr'
    },
    jund: {
        name: 'jund',
        color: 'brg'
    },
    naya: {
        name: 'naya',
        color: 'wrg'
    }
}

export const FOUR_COLOR: ClientLib.IColorSet = {
    chaos: {
        name: 'chaos',
        color: 'ubrg'
    },
    aggression: {
        name: 'aggression',
        color: 'wbrg'
    },
    altruism: {
        name: 'altruism',
        color: 'wurg'
    },
    growth: {
        name: 'growth',
        color: 'wubg'
    },
    artifice: {
        name: 'artifice',
        color: 'wubr'
    }
}

export const CARD_COLORS: ClientLib.IColorSet = {
    single_colors: SINGLE_COLOR,
    guild_colors: GUILDS,
    shard_colors: SHARDS,
    four_color: FOUR_COLOR
}

export const DATASET_TYPES = {
    color: 'data-color-type'
}