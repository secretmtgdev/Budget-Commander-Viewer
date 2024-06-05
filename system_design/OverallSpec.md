# Magic card viewer
## Objective
Tired of looking at budget options on EDHrec that aren't quite budget? Look no further for now you'll soon be able to search for specific staples in your commanders color identity within your budget with the click of a button!

## Requirements
### Functional requirements
#### Search
- Users can search cards by name with suggestions appearing
  - Search bar shuold be generic to be used on other pages
  - Search bar UI and results UI should be customizable
- Users can search cards by color and color combination
- Users can search cards by text
- Users can search cards by price
- Users can search cards by set
- Users can search cards by converted mana cost range
- Users can search cards by power range
- Users can search cards by toughness range

#### Sort
- Users can sort cards by price
- Users can sort cards by converted mana cost
- Users can sort cards by power
- Users can sort cards by toughness
- Users can sort cards by alphabetical and reverse

#### Data persistence
- Users can create an account on the site
- Notification is sent to user upon account creation
- An account is locked for 24 hours if the user enter the wrong password 5 times when signing in
- Users can create lists and save cards into the lists
- Communicates with Scryfall API

### Non functional requirements
- A new user should be created in under 2 seconds
- The website should load in under 3 seconds
- The system should have at least 99.9% availability
- The system should be able to handle thousands of users through horiztonal scaling
- The system should load previously seen data quickly
- Autocompletion should be swift and debounced

## Food for thought
- **What is the tech stack**
  - **Frontend**
    - React
    - Redux
  - **Backend**
    - Python
    - Django
    - GraphQL
    - Docker
    - PostgreSQL
- **What patterns are used?**
  - Singleton pattern is used to manage certain global state values
    - Current cards to render
    - Current colors selected
    - Current card types selected
    - Current price range
    - Current name of card
  - Hooks pattern is used to manage certain async events that change the render state of some components
  - Controlled component pattern is used in the picker components to notify the state of changes upon selection of a color or type of card
  - Conditional rendering is used to determine if a list of cards should be displayed or not
  - REST as the Scryfall API leverages this architectural pattern
  - GraphQL for the single endpoint and the enforcement of a schema that a REST architecture lacks
  - MVT
- **Why React?**
  - React is a library and thus adds a lot more flexibility than a framework
- **Why Redux?**
  - Needed a way for several components to leverage the same global state
- **Why Python?**
  - Easy to read and allows newcomers to the project or coding to quickly pickup on what's happening
- **Why DJango?**
  - Backend framwork with a lot of community support
- **Why containerize Postgres?**
  - Separates data from database application
  - Shields data from harm if application fails
- **Why Docker?**
  - Containerizes Postgres avoiding the need to locally install Postgres and consume processes
- **Why PostgreSQL?**
  - Offers multi-user capabilities which is big for scaling
