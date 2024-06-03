# Budget Commander Search
## System design
- [Overall spec](./system_design/OverallSpec.md)
- [Autocomplete spec](./system_design/Autocomplete/AutocompleteSpec.md)

## Screenshot of the week
![Screenshot of application](https://github.com/secretmtgdev/Budget-Commander-Viewer/blob/main/client/src/assets/weekly_screenshots/week_2.png)

## What can be done now?
- Query by multiple color selections, single shard, and non-overlapping builds
- Query by price range
- Query by partial card name
- Query by text within the card
- View returned by queries
- Load more cards if more cards are available

## What needs cleaning up
- Setup caching mechanism for queries
- Add autocomplete list to search by name
    - Debounce autocomplete
- Add a Loading component
- Add an Error component
- Add a No Network component

## Miscellaneous notes

To find out the number of lines that have been written by developers, on this project, run `git ls-files | grep -v '\public\|\.d.ts\|\.json\|\.png\|\.jpeg\|\.gitignore\|\.md\|\.ico\|\.avif\|\.svg' | xargs wc -l