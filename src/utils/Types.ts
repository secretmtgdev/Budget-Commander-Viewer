export declare namespace ColorLib {
    interface IColorObject {
        [key: string]: string | IColorObject;
    }
}

export declare namespace ScryfallLib {
// Don't need all of othe fields
    interface ICardSearchObject {
        data: any[];
        has_more: boolean;
        next_page: string;
        total_cards: number;
    }
}