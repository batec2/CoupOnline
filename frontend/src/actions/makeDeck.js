import cards from "../data/cards.json" assert { type: 'json'}

/**
 * Makes and shuffles a standard deck of Coup cards
 * @returns Shuffled deck
 */
const makeDeck = () => {
  const cards2 = [...cards];
  const cards3 = [...cards];

  let deck = cards.concat(cards2).concat(cards3);

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [deck[i], deck[j]] = [deck[j], deck[i]]
  }
  console.log(deck)
  return deck;
}

export default makeDeck;