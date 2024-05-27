type rarity = 'common' | 'uncommon' | 'rare' | 'mythic';

export declare namespace ClientLib {
    interface IColor {
        [key: string]: string | IColor;
    }

    interface IPriceRange {
        minPrice: number;
        maxPrice: number;
    }

    interface IAllFilters {
        colors?: string[];
        priceRange?: IPriceRange;
    }
}

export declare namespace ScryfallLib {
    interface ICardResponse {
        data: ICard[];
        has_more: boolean;
        next_page: string;
        total_cards: number;
    }

    interface ICard {
        artist: string;
        artist_id: string;
        cmc: number;
        flavor_text: string;
        keywords: string[];
        mana_cost: string;
        name: string;
        oracle_text: string;
        prices: IPrice;
        rarity: rarity;
        released_at: string;
        set: string;
        set_id: string;
        set_name: string;
        set_uri: string;
        uri: string;
    }

    interface IPrice {
        eur?: string;
        eur_foil?: string;
        usd?: string;
        usd_foil?: string;
    }
}