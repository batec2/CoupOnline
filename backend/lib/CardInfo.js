import GameCard from "./cardEnum.js";
import GameActions from "./actionEnum.js";
const {
  Taxes,
  Assassinate,
  Exchange,
  Steal,
  BlockAid,
  BlockStealAsAmbass,
  BlockStealAsCaptain,
  BlockAssassinate,
} = GameActions;

const CardInfo = {
  [GameCard.Assassin]: {
    character: "Assassin",
    "action-name": "Assassinate",
    "action-effect": "Pay 3 coins \nChoose player to lose influence",
    counteraction: "",
    validActions: [Assassinate],
  },
  [GameCard.Ambassador]: {
    character: "Ambassador",
    "action-name": "Exchange",
    "action-effect": "Take two cards from the deck and return 2 cards",
    counteraction: "",
    validActions: [Exchange, BlockStealAsAmbass],
  },
  [GameCard.Captain]: {
    character: "Captain",
    "action-name": "Steal",
    "action-effect": "Steal 2 Coins from another player",
    counteraction: "",
    validActions: [BlockStealAsCaptain, Steal],
  },
  [GameCard.Contessa]: {
    character: "Contessa",
    "action-name": "",
    "action-effect": "",
    counteraction: "",
    validActions: [BlockAssassinate],
  },
  [GameCard.Duke]: {
    character: "Duke",
    "action-name": "Tax",
    "action-effect": "Take 3 coins from Treasury",
    counteraction: "",
    validActions: [Taxes, BlockAid],
  },
  [GameCard.Eliminated]: {
    character: "Eliminated",
    "action-name": "",
    "action-effect": "",
    counteraction: "",
    validActions: [],
  },
};

export default CardInfo;
