# Autocomplete
## Overview
Autcomplete UI component should allow users to enter a search term into a text box. A list of results should appear in a popup and a user should be able to select a result.

## Questions to consider
- **What kinds of results should be supported?**
  - Text and image information
- **What devices should leverage this component?**
  - Desktop

## Architecture
TODO: Expand upon the current architecture

## Data model

### Card response
```
interface ICardResponse {
    data: ICard[];
    has_more: boolean;
    next_page: string;
    total_cards: number;
}
```

### Card
```
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
```

### Card Image
```
interface ICardImageUris {
    art_crop: string;
    border_crop: string;
    large: string;
    normal: string;
    png: string;
    small: string;
}
```

### Price
```
interface IPrice {
    eur?: string;
    eur_foil?: string;
    usd?: string;
    usd_foil?: string;
}
```

## Interface definition
### Client
Want to make the component flexible enough to be leveraged in other parts of the codebase.

### API
Handled by [Scryfall](https://scryfall.com/docs/api/cards)

### Server API
Handled by [Scryfall](https://scryfall.com/docs/api/cards)

## Optimizations

### Network
#### Handling concurrency issues
Leverage a key-map structure and fetch data from the cache based off of the last input. Indicate that there is no network connection on the page.

#### Handle offline
Read information from the cache, if the result is not in the cache then notify the user.

### Caching
#### Cache structure
All requests are to be stored in the web cache as normalized data `(id: { id, ...responseData })`. A generic key-value strategy would lead to several duplicate entries on keystrokes. A list of unique suggestions could take awhile to filter. This could bog down the website and cause issues with rendering the cards on the page.

#### Cache strategy
All requests are to be stored in the web cache as normalized data `(id: { id, ...responseData })`. I am going with the LRU strategy to evict old queries that may not be beneficial to the user. For the time being there will be no check on TTL.

### Performance
#### Loading speed
I make use of the browser cache to speed up the loads of previously made queries.

#### Debouncing and throttling
User input will be debounced on the keystrokes to avoid firing too many requests to Scryfall.

### User experience
#### Autofocus
This search by name component is the default focused item on the page.

#### Handling states
- Loading: Spinner displayed while querying for results.
- Error: Error banner displayed at the top of the page informing the user to retry the query.
  - This banner should close if the user clicks the 'x' button or peforms the search again.
- No network: Show banner displayed at the top of the page informing the user that they are offline.

#### Keyboard interaction
The user should be able to tab from the search bar into the suggestions list that shows up. The user should be able to focus on the autocomplete shortcut using the '/' key.

### Accessibility
#### Screen readers
- Use `<ul>` and `<li>` for the results.
- Use `role='combobox'` because the search bar controls the visuals of the suggestions.
- Use `aria-haspopup='listbox'` on the search bar since there is an auto suggestion.
- Use `aria-autocomplete='list'` because the suggestions are stacked in a top down fashion.

#### Keyboard interaction
- Users should be able to use the arrow keys to go up and down the suggestions list.
- Users should be able to dismiss the suggestions list if it is visible.