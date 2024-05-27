export declare namespace ColorLib {
    interface IColor {
        [key: string]: string | IColor;
    }
}

export declare namespace ScryfallLib {
// Don't need all of othe fields
    interface ICard {
        data: any[];
        has_more: boolean;
        next_page: string;
        total_cards: number;
    }
}