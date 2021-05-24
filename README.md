# Introduction 

beSolitair is

- An attempt at creating a solitair/spider implementation
- An opportunity to try [vite-js](https://vitejs.dev/)
- An opportunity to learn a few things
    - css `user-select: none;` 
    - playing cards with [unicode](https://en.wikipedia.org/wiki/Playing_cards_in_Unicode)
    - [uvu](https://twitter.com/lukeed05/status/1283133709491662848) and c8

You can have a look at the progress [here](https://mestachs.github.io/besolitair/)

# Roadmap

  - [x] render cards and decks
  - [x] generate cards and decks for spider
  - [x] single click : pick first possible move
  - [ ] add tests
  - [x] implements all the rules :
       - [x] check sequential same suite for big move
       - [x] distribute remaining cards only if all decks are filled
  - [x] check you completed a suite
  - [x] check you won 
  - [ ] if won then [celebrate](https://github.com/crashmax-off/fireworks-js/)
  - [ ] make it pretty and more usable
       - [ ] animation
       - [ ] drag and drop
       - [ ] play card sound
       - [ ] play radio/music
  - [x] handle undo (basic)
  - [x] handle hint (highlight possible moves)
  - [ ] implement auto play with some heuristics
  - [ ] setup github actions
  - [ ] add features to ease test 
      - [x] export game state, 
      - [x] load nearly solved game
      - [ ] enabled these feature only in local

# Developement setup

```
yarn
yarn test
yarn dev
```

deployment to gh-pages

```
./deploy.sh
```
