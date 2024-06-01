import { EMPTY_CARD_RESPONSE, SCRYFALL_ENDPOINTS } from './ApiConstants';
import { ClientLib, ScryfallLib } from './Types';
import { getFullQueryEndpoint } from './Utils';

const getColorQuery = (colors: string[]) => colors.reduce((prevColor, curColor) => prevColor + curColor);
const getCardsByQuery = async (epQuery: string): Promise<[ScryfallLib.ICard[], string]> => {
    let query = `${getFullQueryEndpoint(SCRYFALL_ENDPOINTS.search)}?q=${epQuery}`;
    return await getCardsByEndpoint(query);
}

export const getCardsByEndpoint = async (endPoint: string): Promise<[ScryfallLib.ICard[], string]> => {
    let cards: ScryfallLib.ICard[] = [];
    const cardResponse = await fetch(endPoint)
        .then(res => {
            if (res.status >= 400) {
                throw new Error(res.statusText);
            }            
            return res.json()
        })        
        .then((res: ScryfallLib.ICardResponse) => res)
        .catch(() => {
            // TODO: Create a component to inform the user that no cards are available
            return EMPTY_CARD_RESPONSE;
        });
    cards = [...cards, ...cardResponse.data as ScryfallLib.ICard[]];
    return [cards, cardResponse.next_page];
}

export const getCardsByFilters = async (filters: ClientLib.IAllFilters) => {
    let curQuery = [];
    if (filters.colorCombinations && filters.colorCombinations.colors!.length > 0) {
        if (filters.colorCombinations.areSingle && filters.colorCombinations.noOtherColors) {
            curQuery.push(`c<=${getColorQuery(filters.colorCombinations.colors)}`);
        } else {
            curQuery.push(`c${filters.colorCombinations.areSingle && !filters.colorCombinations.noOtherColors ? ':' : '='}${getColorQuery(filters.colorCombinations.colors)}`);
        }
    }

    if (!!filters.priceRange) {
        curQuery.push(`usd>=${filters.priceRange.minPrice}`);
        if (filters.priceRange.maxPrice && filters.priceRange.maxPrice !== Infinity && !isNaN(filters.priceRange.maxPrice)) {
            curQuery.push(`usd<=${filters.priceRange.maxPrice}`);
        }
    }

    if (!!filters.textFilter) {
        if (filters.textFilter.name) {
            curQuery.push(filters!.textFilter.name);
        }

        if (filters.textFilter.text) {
            curQuery.push(`o:${filters.textFilter.text}`)
        }
    }

    if (filters.cardTypeSelection && filters.cardTypeSelection.length > 0) {
        curQuery.push(`t:/${filters.cardTypeSelection.join('|')}{1,}/`)
    }

    return await getCardsByQuery(curQuery.join('+'));
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
