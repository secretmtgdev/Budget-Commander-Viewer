import { SCRYFALL_BASE_URI } from "./ApiConstants";
import { CARD_COLORS, GUILDS, SHARDS } from "./MagicConstants";
import { ColorLib } from "./Types";

export const getFullQueryEndpoint = (queryEndpoint: string) => `${SCRYFALL_BASE_URI}/${queryEndpoint}`;
export const disableElementsByDataSet = (datasetType: string, ...toDisable: any[]) => {
    const elements = document.querySelectorAll<HTMLInputElement>(`[${datasetType}]`);
    Array.from(elements)
    .filter(element => {
        const dataType = element.getAttribute(datasetType);
        return toDisable.indexOf(parseInt(dataType!.valueOf())) >= 0;
    })
    .forEach(element => {
        element.disabled = true;
        element.parentElement?.classList.add('disabled');
    });
}

/*************************************
 ** All color related query helpers **
 *************************************/
export const getAllMagicColors = (): string[][] => {
    const colors: string[][] = [];
    const getMagicColorsHelper = (cardColorObj: ColorLib.IColor) => {
        for (const color in cardColorObj) {
            if (typeof cardColorObj[color] === 'string') {
                colors.push([color, cardColorObj[color] as string]);
            } else {
                getMagicColorsHelper(cardColorObj[color] as ColorLib.IColor);
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