# Budget Commander Search
## Screenshot of the week
![Screenshot of application](https://github.com/secretmtgdev/Budget-Commander-Viewer/blob/main/src/assets/weekly_screenshots/week_2.png)

## Objective
Tired of looking at budget options on EDHrec that aren't quite budget? Look no further for now you'll soon be able to search for specific staples in your commanders color identity within your budget with the click of a button!

## What can be done now?
- Query by multiple color selections, single shard, and non-overlapping builds
- Query by price range
- Query by partial card name
- Query by text within the card
- View returned by queries
- Load more cards if more cards are available

## What needs cleaning up
- Caching responses to speed up load time
- Prevent non-commander legal cards from being shown
- Add a component notifying the user that there were no cards found
- Fix up modal component to render card data

## Miscellaneous notes

To find out the number of lines that have been written by developers, on this project, run `git ls-files | grep -v '\.d.ts\|\.json\|\.png\|\.jpeg\|\.gitignore\|\.md\|\.ico\|\.avif\|\.svg' | xargs wc -l`
