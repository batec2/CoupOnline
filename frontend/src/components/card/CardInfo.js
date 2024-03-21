import GameCard from "@/lib/cardEnum";
const CardInfo = {
  [GameCard.Assassin]: {
    character: "Assassin",
    "action-name": "Assassinate",
    "action-effect": "Pay 3 coins \nChoose player to lose influence",
    counteraction: "",
  },
  [GameCard.Ambassador]: {
    character: "Ambassador",
    "action-name": "Exchange",
    "action-effect": "Take two cards from the deck and return 2 cards",
    counteraction: "",
  },
  [GameCard.Captain]: {
    character: "Captain",
    "action-name": "Steal",
    "action-effect": "Steal 2 Coins from another player",
    counteraction: "",
  },
  [GameCard.Contessa]: {
    character: "Contessa",
    "action-name": "",
    "action-effect": "",
    counteraction: "",
  },
  [GameCard.Duke]: {
    character: "Duke",
    "action-name": "Tax",
    "action-effect": "Take 3 coins from Treasury",
    counteraction: "",
  },
  [GameCard.Eliminated]: {
    character: "Eliminated",
    "action-name": "",
    "action-effect": "",
    counteraction: "",
  },
};

export default CardInfo;
