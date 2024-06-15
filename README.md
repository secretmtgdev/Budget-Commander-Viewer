# Magic Viewer V2
## System design
- [Overall spec](./system_design/OverallSpec.md)
- [Autocomplete spec](./system_design/Autocomplete/AutocompleteSpec.md)

## Screenshot of the week
![Screenshot of application](https://github.com/secretmtgdev/Budget-Commander-Viewer/blob/main/client/src/assets/weekly_screenshots/week_3.png)

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

To find out the number of lines that have been written by developers, on this project, run `git ls-files | grep -v '\public\|\.d.ts\|\.json\|\.png\|\.jpeg\|\.gitignore\|\.md\|\.ico\|\.avif\|\.svg' | xargs wc -l`

To run the GraphQL server, run `python3 manage.py runserver` within the `server/core` directory

## Schemas
![Accounts Schema](https://github.com/secretmtgdev/Budget-Commander-Viewer/blob/main/system_design/images/account_schema.png)
![Alias Schema](https://github.com/secretmtgdev/Budget-Commander-Viewer/blob/main/system_design/images/alias_schema.png)

## Learning references 
- [SaltyCrane - Creating a GraphQL API with Python, Graphene, and Postgres](https://www.saltycrane.com/blog/2019/02/creating-graphql-api-python-graphene-and-postgres/#django-postgres)
- [Mitul Rathod - Empowering your Django backend with GraphQl](https://medium.com/simform-engineering/empowering-your-django-backend-with-graphql-a-powerful-combination-764babd30bb0)
- [Caleb Curry - Consume graphql on the frontend](https://www.youtube.com/watch?v=fbyMvE9uJ4w)
