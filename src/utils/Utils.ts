import { SCRYFALL_BASE_URI } from "./ApiConstants";
import { CARD_COLORS, GUILDS, SHARDS } from "./MagicConstants";
import { IColorObject } from "./Types";

export const getFullQueryEndpoint = (queryEndpoint: string) => `${SCRYFALL_BASE_URI}/${queryEndpoint}`;


/*************************************
 ** All color related query helpers **
 *************************************/
export const getAllMagicColors = (): string[][] => {
    const colors: string[][] = [];
    const getMagicColorsHelper = (cardColorObj: IColorObject) => {
        for (const color in cardColorObj) {
            if (typeof cardColorObj[color] === 'string') {
                colors.push([color, cardColorObj[color] as string]);
            } else {
                getMagicColorsHelper(cardColorObj[color] as IColorObject);
            }
        }
    }

    getMagicColorsHelper(CARD_COLORS);
    return colors;
}

export const isSingleColor = (selectedType: string) => Object.values(CARD_COLORS).indexOf(selectedType) >= 0;

// We can leverage 'in' because the keys are the same as the values
export const isGuild = (selectedType: string) => selectedType in GUILDS;
export const isShard = (selectedType: string) => selectedType in SHARDS;