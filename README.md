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
  - [ ] implements all the rules :
       - [ ] check sequential same suite for big move
       - [ ] distribute remaining cards only if all decks are filled
  - [x] check you completed a suite
  - [ ] check you won and [celebrate](https://github.com/crashmax-off/fireworks-js/)
  - [x] handle undo (basic)
  - [ ] handle hint (highlight possible moves)
  - [ ] setup github actions

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
