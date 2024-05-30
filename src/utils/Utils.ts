import { SCRYFALL_BASE_URI } from "./ApiConstants";
import { CARD_COLORS, GUILDS, SHARDS, SINGLE_COLOR } from "./MagicConstants";
import { ClientLib } from "./Types";

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
        if (element.parentElement?.classList.contains('selected')) {
            element.parentElement.classList.remove('selected');
        }
    });
}

export const enableElementsByDataSet = (datasetType: string, ...toEnable: any[]) => {
    const elements = document.querySelectorAll<HTMLInputElement>(`[${datasetType}]`);
    Array.from(elements)
    .filter(element => {
        const dataType = element.getAttribute(datasetType);
        return toEnable.indexOf(parseInt(dataType!.valueOf())) >= 0;
    })
    .forEach(element => {
        element.disabled = false;
        element.parentElement?.classList.remove('disabled');
        if (element.parentElement?.classList.contains('selected')) {
            element.parentElement.classList.remove('selected');
        }
    });
}

/*************************************
 ** All color related query helpers **
 *************************************/
export const getAllMagicColors = (): string[][] => {
    const colors: string[][] = [];
    const getMagicColorsHelper = (cardColorObj: ClientLib.IColorSet) => {
        for (const color in cardColorObj) {
            if ('color' in cardColorObj[color]) {
                colors.push([cardColorObj[color].name as string, cardColorObj[color].color as string]);
            } else {
                getMagicColorsHelper(cardColorObj[color] as ClientLib.IColorSet);
            }
        }
    }

    getMagicColorsHelper(CARD_COLORS);
    return colors;
}

const isColorNameValid = (selectedType: string, colorType: ClientLib.IColorSet) => {
    for (const key in colorType) {
        if (colorType[key].color === selectedType) {
            return true;
        }
    }
    
    return false;
}

export const isSingleColor = (selectedType: string) => isColorNameValid(selectedType, SINGLE_COLOR);
export const isGuild = (selectedType: string) => isColorNameValid(selectedType, GUILDS);
export const isShard = (selectedType: string) => isColorNameValid(selectedType, SHARDS);

/*******************************
 ** All redux related helpers **
 *******************************/
export const mapStateToProps = (state: any) => {
    return {
        cardList: state.cardList,
        colorSelection: state.colorSection,
        priceSelection: state.priceSelection
    }
}