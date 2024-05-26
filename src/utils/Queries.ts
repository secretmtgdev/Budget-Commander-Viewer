import { SCRYFALL_ENDPOINTS } from './ApiConstants';
import { getFullQueryEndpoint } from './Utils';

export const getCardsByColors = (colors: string[]) => {
    if (!colors || colors.length === 0) {
        return;
    }

    const colorQuery = colors.reduce((prevColor, curColor) => prevColor + curColor);
    const epQuery = `${getFullQueryEndpoint(SCRYFALL_ENDPOINTS.search)}?q=c:${colorQuery}`;
    fetch(epQuery)
        .then(res => res.json())
        .then(res => console.error(res));
}

export const getCardsByCardType = () => {}
export const getCardsByText = () => {}
export const getCardsByManaCost = () => {}
export const getCardsByPower = () => {}
export const getCardsByToughness = () => {}
export const getCardsByRarity = () => {}
export const getCardBySet = () => {}