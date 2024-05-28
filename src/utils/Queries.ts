import { EMPTY_CARD_RESPONSE, SCRYFALL_ENDPOINTS } from './ApiConstants';
import { ClientLib, ScryfallLib } from './Types';
import { getFullQueryEndpoint } from './Utils';

const getColorQuery = (colors: string[]) => colors.reduce((prevColor, curColor) => prevColor + curColor);
const getCardsByQuery = async (epQuery: string): Promise<[ScryfallLib.ICard[], string]> => {
    let query = `${getFullQueryEndpoint(SCRYFALL_ENDPOINTS.search)}?q=${epQuery}`;
    let cards: ScryfallLib.ICard[] = [];
    const cardResponse = await fetch(query)
        .then(res => res.json())
        .then((res: ScryfallLib.ICardResponse) => res)
        .catch(() => EMPTY_CARD_RESPONSE);
    cards = [...cards, ...cardResponse.data];
    return [cards, cardResponse.next_page];
}

export const getCardsByFilters = async (filters: ClientLib.IAllFilters) => {
    let curQuery = [];
    if (filters.colorCombinations && filters.colorCombinations.colors!.length > 0) {
        curQuery.push(`c${filters.colorCombinations.areSingle ? ':' : '='}${getColorQuery(filters.colorCombinations.colors)}`);
    }

    if (filters.priceRange) {
        curQuery.push(`+usd>=${filters.priceRange.minPrice}`);
        if (filters.priceRange.maxPrice !== Infinity) {
            curQuery.push(`+usd<=${filters.priceRange.maxPrice}`);
        }
    }

    return await getCardsByQuery(curQuery.join(''));
}

export const getCardsByColors = async (colors: string[]) => {
    if (!colors || colors.length === 0) {
        return;
    }

    const colorQuery = getColorQuery(colors);
    let epQuery = `${getFullQueryEndpoint(SCRYFALL_ENDPOINTS.search)}?q=c:${colorQuery}`;
    let [cards, nextPage]: [ScryfallLib.ICard[], string] = await getCardsByQuery(epQuery);
    return [cards, nextPage];
}

export const getCardsByCardType = () => {}
export const getCardsByText = () => {}
export const getCardsByManaCost = () => {}
export const getCardsByPower = () => {}
export const getCardsByToughness = () => {}
export const getCardsByRarity = () => {}
export const getCardBySet = () => {}