import { SCRYFALL_BASE_URI } from "./ApiConstants";
import { CARD_COLOR, CARD_COLORS, FOUR_COLOR, GUILDS, MAGIC_TYPES, SHARDS, SINGLE_COLOR } from "./MagicConstants";
import { ClientLib } from "./Types";

export const getFullQueryEndpoint = (queryEndpoint: string) => `${SCRYFALL_BASE_URI}/${queryEndpoint}`;
const disableInputElement = (element: HTMLInputElement) => {
    element.disabled = true;
    element.parentElement?.classList.add('disabled');
    if (element.parentElement?.classList.contains('selected')) {
        element.parentElement.classList.remove('selected');
    }
}

const enableInputElement = (element: HTMLInputElement) => {
    element.disabled = false;
    element.parentElement?.classList.remove('disabled');
    if (element.parentElement?.classList.contains('selected')) {
        element.parentElement.classList.remove('selected');
    }
}

export const disableOtherDatasetElements = (enabledElement: HTMLInputElement, datasetType: string) => {
    const elements = document.querySelectorAll<HTMLInputElement>(`[${datasetType}]`);
    Array.from(elements)
    .filter(element => !element.isEqualNode(enabledElement))
    .forEach(element => disableInputElement(element));
}

export const disableElementsByDataSet = (datasetType: string, ...toDisable: any[]) => {
    const elements = document.querySelectorAll<HTMLInputElement>(`[${datasetType}]`);
    Array.from(elements)
    .filter(element => {
        const dataType = element.getAttribute(datasetType);
        return toDisable.indexOf(parseInt(dataType!.valueOf())) >= 0;
    })
    .forEach(element => disableInputElement(element));
}

export const enableAllDatasetElements = (datasetType: string) => {
    const elements = document.querySelectorAll<HTMLInputElement>(`[${datasetType}]`);
    Array.from(elements)
    .forEach(element => enableInputElement(element));
}

export const enableElementsByDataSet = (datasetType: string, ...toEnable: any[]) => {
    const elements = document.querySelectorAll<HTMLInputElement>(`[${datasetType}]`);
    Array.from(elements)
    .filter(element => {
        const dataType = element.getAttribute(datasetType);
        return toEnable.indexOf(parseInt(dataType!.valueOf())) >= 0;
    })
    .forEach(element => enableInputElement(element));
}

/*************************************
 ** All color related query helpers **
 *************************************/
export const getAllMagicColors = (): ClientLib.IPickerType[] => {
    const colors: ClientLib.IPickerType[] = [];
    const getMagicColorsHelper = (cardColorObj: ClientLib.IColorSet) => {
        for (const color in cardColorObj) {
            if ('color' in cardColorObj[color]) {
                const colorName = cardColorObj[color].name as string;
                const colorValue = cardColorObj[color].color as string;
                const colorPicker: ClientLib.IPickerType = {
                    name: colorName,
                    value: colorValue,
                    datasetInfo: {
                        'data-color-type': (isSingleColor(colorValue) ?
                            CARD_COLOR.single :
                            (isGuild(colorValue) ?
                                CARD_COLOR.guild :
                                (isShard(colorValue) ?
                                    CARD_COLOR.shard :
                                    CARD_COLOR.fourColor
                                )
                            )
                        ).toString()
                    }
                }
                colors.push(colorPicker);
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
export const isFourColor = (selectedType: string) => isColorNameValid(selectedType, FOUR_COLOR);

/***********************************
 ** All card type related helpers **
 ***********************************/
export const getAllCardTypes = (): ClientLib.IPickerType[] => {
    const allCardTypes: ClientLib.IPickerType[] = [];
    for (const [cardCategory, cardTypes] of Object.entries(MAGIC_TYPES)) {
        for (const cardType of cardTypes) {
            allCardTypes.push({
                name: cardType,
                value: cardType,
                datasetInfo: {
                    'data-card-type': cardCategory
                }
            })
        }
    }
    return allCardTypes;
}

/*******************************
 ** All redux related helpers **
 *******************************/
export const mapStateToProps = (state: any) => {
    return {
        cardList: state.cardList,
        colorSelection: state.colorSection,
        priceSelection: state.priceSelection,
        searchQuery: state.searchQuery
    }
}

export const minDistance = (word1: string, word2: string): number => {
    const ROWS = word1.length + 1;
    const COLS = word2.length + 1;
    let dp = new Array();
    for (let r = 0; r < ROWS; r++) {
        dp.push(new Array());
        for (let c = 0; c < COLS; c++) {
            dp[r].push(0);
        }
    }

    for (let r = 0; r < ROWS; r++) {
        dp[r][0] = r;
    }
    
    for (let c = 0; c < COLS; c++) {
        dp[0][c] = c;
    }
    
    for (let r = 1; r < ROWS; r++) {
        for (let c = 1; c < COLS; c++) {
            if (word1.charAt(r - 1) === word2.charAt(c - 1)) {
                dp[r][c] = dp[r-1][c-1];
            } else {
                dp[r][c] = 1 + Math.min(dp[r-1][c-1], dp[r][c-1], dp[r-1][c]);
            }
        }
    }
    
    return dp[ROWS - 1][COLS - 1];
};
