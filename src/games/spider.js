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

  throw new Error("Only 1 or 2 suites supported");
};

export const shuffle = (cards) => cards.sort((a, b) => 0.5 - Math.random());

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

export const setupDefaultGame = (numberOfSuites) =>
  toGame(shuffle(shuffle(generateSpideCards(numberOfSuites))));

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

export const possibleMoves = (card, game) => {
  const moves = [];
  if (card.visible) {
    for (let deck of game.decks) {
      const cardIndex = deck.cards.findIndex((c) => c.id === card.id);

      if (cardIndex >= 0) {
        const selectedCards = deck.cards.slice(cardIndex, deck.cards.length);
        const asuite = isASuite(selectedCards);
        if (asuite) {
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
