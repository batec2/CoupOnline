import ambassador from "./ambassador64.png"
import assassin from "./assassin64.png"
import notFound from "./not-found.png"
import GameCard from "@/lib/cardEnum";
import CardInfo from "@/components/card/CardInfo";

import "./card.styles.css";
import useGameContext from "@/context/useGameContext.js";

const Card = ({ card, onClick }) => {
  const { isTarget } = useGameContext();
  console.log(card);
  let img = notFound;
  let bgColor = "bg-cards-duke";

  let cardInfo = CardInfo[card];

  switch (card) {
    case GameCard.Duke:
      img = ambassador;
      bgColor = "bg-cards-duke ";
      break;
    case GameCard.Assassin:
      img = assassin;
      bgColor = "bg-cards-assassin";
      break;
    case GameCard.Ambassador:
      img = ambassador;
      bgColor = "bg-cards-ambassador";
      break;
    case GameCard.Captain:
      img = ambassador;
      bgColor = `bg-cards-captain`;
      break;
    case GameCard.Contessa:
      img = assassin;
      bgColor = `bg-cards-contessa`;
      break;
    case GameCard.Eliminated:
      img = assassin;
      bgColor = `bg-cards-eliminated`
      break;
  }

  const nonTargetStyle = `card ${bgColor} border border-black px-2 py-2`;
  const targetStyle = `card ${bgColor} border border-red px-2 py-2 hover:shadow-lg`;

  return (
    <div
      onClick={() => onClick()}
      className={isTarget ? targetStyle : nonTargetStyle}
    >
      <h4>{cardInfo["character"]}</h4>
      <img src={img} alt="char_icon" />
      <h5>Action</h5>
      <h6>{cardInfo["action-name"] == "" ? "N/A" : cardInfo["action-name"]}</h6>
      <p>{cardInfo["action-effect"] == "" ? "N/A" : cardInfo["action-effect"]}</p>
      <h4>Counteraction</h4>
      <p>{cardInfo["counteraction"] == "" ? "N/A" : cardInfo["counteraction"]}</p>
    </div>
  );
};

export default Card;