type rarity = 'common' | 'uncommon' | 'rare' | 'mythic';

export declare namespace ClientLib {
    interface IColor {
        name: string;
        color: string;
    }
    
    interface IColorSet {
        [key: string]: IColor | IColorSet;
    }

    interface IPriceRange {
        minPrice: number;
        maxPrice?: number;
    }

    interface ISearchQuery {
        name?: string;
        text?: string;
    }

    interface IAllFilters {
        colorCombinations?: {
            areSingle: boolean;
            areGuild: boolean;
            areShard: boolean;
            colors: string[];
            noOtherColors: boolean;
        }
        priceRange?: IPriceRange;
        textFilter?: ISearchQuery;
        cardTypeSelection?: string[]
    }

    interface IPickerType {
        name: string;
        value: string;
        datasetInfo: {
            // data-* to value
            [key: string]: string
        };
    }
}

export declare namespace ServerLib {
    interface IAlias {
        alias: string;
        query: string;
        shortDescription: string;
    }
}

export declare namespace ScryfallLib {
    interface ICardResponse {
        data: ICard[];
        has_more: boolean;
        next_page: string;
        total_cards: number;
    }

    interface ICardImageUris {
        art_crop: string;
        border_crop: string;
        large: string;
        normal: string;
        png: string;
        small: string;
    }

    interface ICard {
        artist: string;
        artist_id: string;
        cmc: number;
        flavor_text: string;
        image_uris?: ICardImageUris;
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