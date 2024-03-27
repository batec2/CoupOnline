import GameCard from "@/lib/cardEnum";
import GameActions from "@/lib/actionEnum";
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
    "action-effect": "Take 2 cards from the deck, then return 2 cards",
    counteraction: "Block stealing",
    validActions: [Exchange, BlockStealAsAmbass],
  },
  [GameCard.Captain]: {
    character: "Captain",
    "action-name": "Steal",
    "action-effect": "Steal 2 Coins from another player",
    counteraction: "Block stealing",
    validActions: [BlockStealAsCaptain, Steal],
  },
  [GameCard.Contessa]: {
    character: "Contessa",
    "action-name": "",
    "action-effect": "Block assassination",
    counteraction: "",
    validActions: [BlockAssassinate],
  },
  [GameCard.Duke]: {
    character: "Duke",
    "action-name": "Tax",
    "action-effect": "Take 3 coins from Treasury",
    counteraction: "Block foreign aid",
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
