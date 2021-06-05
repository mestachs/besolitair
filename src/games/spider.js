export const ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
export const suites = ["heart", "spades", "diamond", "club"];

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8; // not a good random source but let's try this
    return v.toString(16);
  });
}

export const generateCardsForSuite = (suit) => {
  return ranks.map((rank) => {
    return {
      id: uuidv4(),
      rank: rank,
      suit: suit,
    };
  });
};

export const generateSpideCards = (numberOfSuites) => {
  if (numberOfSuites == 1) {
    return generateCardsForSuite("spades")
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"));
  }

  if (numberOfSuites == 2) {
    return generateCardsForSuite("spades")
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("heart"))
      .concat(generateCardsForSuite("heart"))
      .concat(generateCardsForSuite("heart"))
      .concat(generateCardsForSuite("heart"));
  }

  if (numberOfSuites == 4) {
    return generateCardsForSuite("spades")
      .concat(generateCardsForSuite("spades"))
      .concat(generateCardsForSuite("diamond"))
      .concat(generateCardsForSuite("diamond"))
      .concat(generateCardsForSuite("heart"))
      .concat(generateCardsForSuite("heart"))
      .concat(generateCardsForSuite("club"))
      .concat(generateCardsForSuite("club"));
  }

  throw new Error("Only 1, 2 or 4 suites supported not "+numberOfSuites);
};

export const shuffle = (cards, level, numberOfSuites) => {
  const tendency = level == "easy" ? 0.2 : 0.5;
  for (let step = 0; step < numberOfSuites; step++) {
    cards.sort((a, b) => tendency - Math.random());
  }
  return cards;
};

export const toGame = (cards) => {
  const decks = [];
  for (let deckIndex = 0; deckIndex < 10; deckIndex++) {
    for (let tourIndex = 0; tourIndex < 5; tourIndex++) {
      const card = cards.shift();
      if (decks[deckIndex] == undefined) {
        decks[deckIndex] = { id: deckIndex, cards: [] };
      }
      if (card) {
        decks[deckIndex].cards.push({ ...card, visible: false });
      }
    }
  }
  for (let deckIndex = 0; deckIndex < 4; deckIndex++) {
    const card = cards.shift();
    if (card) {
      decks[deckIndex].cards.push({ ...card, visible: false });
    }
  }
  for (let deckIndex = 0; deckIndex < 10; deckIndex++) {
    const card = cards.shift();
    if (card) {
      decks[deckIndex].cards.push({ ...card, visible: true });
    }
  }

  return {
    decks,
    remaingCards: cards,
  };
};

export const setupDefaultGame = (numberOfSuites, level) =>
  toGame(shuffle(generateSpideCards(numberOfSuites), level, numberOfSuites));

export const cloneGame = (game) => JSON.parse(JSON.stringify(game));

export const lastCard = (deck) => deck.cards[deck.cards.length - 1];

export const isASuite = (cards) => {
  if (cards.length == 1) {
    return true;
  }
  let previous = cards[0];
  for (let card of cards.slice(1)) {
    if (card.rank != previous.rank - 1) {
      return false;
    }
    previous = card;
  }
  return true;
};

export const isSameSuite = (cards) => {
  const s = cards[0].suit
  const samesuite = cards.every(c => c.suit == s)
  return samesuite
}

export const possibleMoves = (card, game) => {
  const moves = [];
  if (card.visible) {
    for (let deck of game.decks) {
      const cardIndex = deck.cards.findIndex((c) => c.id === card.id);

      if (cardIndex >= 0) {
        const selectedCards = deck.cards.slice(cardIndex, deck.cards.length);
        const asuite = isASuite(selectedCards);
        const sameSuite = isSameSuite(selectedCards)
        if (asuite && sameSuite) {
          const playableDecks = game.decks.filter((deck) => {
            const candidateCard = lastCard(deck);
            if (candidateCard == undefined) {
              return true;
            }
            if (candidateCard.rank - 1 == card.rank) {
              return true;
            }
          });

          playableDecks.forEach((targetDeck) =>
            moves.push({
              card: card,
              sourceDeck: deck,
              sourceCardIndex: cardIndex,
              targetDeck: targetDeck,
            })
          );
        }
      }
    }
  }
  return moves;
};

export const allPossibleMoves = (game) => {
  let results = [];
  for (let deck of game.decks) {
    for (let card of deck.cards.filter((c) => c.visible)) {
      const moves = possibleMoves(card, game);
      results = results.concat(moves);
    }
  }
  return results;
};

export const moveCard = (game, move) => {
  if (move == undefined) {
    return game;
  }
  const newgame = cloneGame(game);
  const sourceDeck = newgame.decks[move.sourceDeck.id];
  const movedCards = sourceDeck.cards.slice(move.sourceCardIndex);
  sourceDeck.cards = sourceDeck.cards.slice(0, move.sourceCardIndex);
  const last = lastCard(sourceDeck);
  if (last) {
    last.visible = true;
  }
  movedCards.forEach((c) => newgame.decks[move.targetDeck.id].cards.push(c));
  return newgame;
};

export const checkSuiteCombined = (game) => {
  for (let deck of game.decks) {
    const last = lastCard(deck);
    if (last && last.rank == 1) {
      const candidateSuite = deck.cards.slice(
        deck.cards.length - 13,
        deck.cards.length
      );
      const allSameSuiteAndVisible = candidateSuite.every(
        (c) => c.suit == last.suit && c.visible
      );
      const candidateRanks = candidateSuite.map((c) => c.rank);
      const consecutive =
        JSON.stringify(candidateRanks) ==
        JSON.stringify([13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
      if (allSameSuiteAndVisible && consecutive) {
        const newgame = cloneGame(game);
        newgame.decks[deck.id].cards = newgame.decks[deck.id].cards.filter(
          (c, index) => index < deck.cards.length - 13
        );
        const last = lastCard(newgame.decks[deck.id]);
        if (last) {
          last.visible = true;
        }
        return newgame;
      }
    }
  }
  return game;
};

export const checkWon = (game) => {
  const allDeckEmpty = game.decks.every((deck) => deck.cards.length == 0);
  const noRemainingCards = game.remaingCards.length == 0;
  if (allDeckEmpty && noRemainingCards) {
    game.status = "won";
  }
  return game;
};

export const distributeRemainingCards = (game) => {
  const newGame = cloneGame(game);

  if (game.decks.some((deck) => deck.cards.length == 0)) {
    alert(
      "All decks should have at least one card to distribute remaining cards"
    );
    return newGame;
  }

  const cards = newGame.remaingCards;
  for (let deckIndex = 0; deckIndex < 10; deckIndex++) {
    const card = cards.shift();
    if (card) {
      newGame.decks[deckIndex].cards.push({ ...card, visible: true });
    }
  }

  return newGame;
};

export const randomItem = (items) =>
  shuffle(items)[Math.floor(Math.random() * items.length)];

export const numberOfHidenCards = (game) =>
  game.decks
    .map((deck) => deck.cards.filter((c) => c.visible == false).length)
    .reduce((a, b) => a + b, 0);

export const numberOfCards = (game) =>
  game.decks.map((deck) => deck.cards.length).reduce((a, b) => a + b, 0);

export const biggestDeckCards = (game) =>
  Math.max(
    ...game.decks.map((deck) => deck.cards.filter((c) => c.visible).length)
  );

export const findBestMove = (moves, game) => {
  if (moves.length == 0) {
    return;
  }
  //TODO get smarter take a better heuristic, longest suite or test more turns and see if better outcome
  for (let move of moves) {
    const newGame = checkSuiteCombined(moveCard(game, move));
    move.numberOfHidenCards =
      biggestDeckCards(newGame) +
      (104 - numberOfHidenCards(newGame)) +
      (104 - numberOfCards(newGame));
  }
  moves = moves.sort((a, b) =>
    a.numberOfHidenCards < b.numberOfHidenCards ? -1 : 1
  );

  let move;
  if (Math.random() > 0.1) {
    move = randomItem(moves);
  } else {
    move = moves[moves.length - 1];
  }

  return move;
};
