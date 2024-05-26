import { SCRYFALL_BASE_URI } from "./ApiConstants";
import { CARD_COLORS } from "./MagicConstants";
import { IColorObject } from "./Types";

export const getFullQueryEndpoint = (queryEndpoint: string) => `${SCRYFALL_BASE_URI}/${queryEndpoint}`;
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