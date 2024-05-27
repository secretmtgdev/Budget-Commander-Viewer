import { SCRYFALL_ENDPOINTS } from './ApiConstants';
import { ClientLib, ScryfallLib } from './Types';
import { getFullQueryEndpoint } from './Utils';

const getColorQuery = (colors: string[]) => colors.reduce((prevColor, curColor) => prevColor + curColor);
const getCardsByQuery = async (epQuery: string): Promise<ScryfallLib.ICard[]> => {
    let cards: ScryfallLib.ICard[] = [];
    let gettingAllCards = true;
    while (gettingAllCards) {
        const cardBatch = await fetch(epQuery)
        .then(res => res.json())
        .then((res: ScryfallLib.ICardResponse) => {
            if (res.has_more) {
                epQuery = res.next_page;
            }

            gettingAllCards = res.has_more;
            return res.data;
        });

        cards = [...cards, ...cardBatch];
    }

    return cards;
}

export const getCardsByFilters = async (filters: ClientLib.IAllFilters) => {
    let curQuery = [`${getFullQueryEndpoint(SCRYFALL_ENDPOINTS.search)}?q=`];
    if (filters.colors) {
        curQuery.push(`c:${getColorQuery(filters.colors)}`);
    }

    if (filters.priceRange) {
        curQuery.push(`+usd>=${filters.priceRange.minPrice}`);
        if (filters.priceRange.maxPrice !== Infinity) {
            curQuery.push(`+usd<=${filters.priceRange.maxPrice}`);
        }
        
    }

    const cards = await getCardsByQuery(curQuery.join(''));
    console.error(cards);
    return cards;
}

export const getCardsByColors = async (colors: string[]) => {
    if (!colors || colors.length === 0) {
        return;
    }

    const colorQuery = getColorQuery(colors);
    let epQuery = `${getFullQueryEndpoint(SCRYFALL_ENDPOINTS.search)}?q=c:${colorQuery}`;
    let cards: ScryfallLib.ICard[] = await getCardsByQuery(epQuery);
    return cards;
}

export const getCardsByCardType = () => {}
export const getCardsByText = () => {}
export const getCardsByManaCost = () => {}
export const getCardsByPower = () => {}
export const getCardsByToughness = () => {}
export const getCardsByRarity = () => {}
export const getCardBySet = () => {}