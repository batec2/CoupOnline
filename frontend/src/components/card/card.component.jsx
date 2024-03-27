import ambassador from "./Ambassador1.png";
import assassin from "./Assassin1.png";
import captain from "./Captain2.png";
import duke from "./Duke1.png";
import contessa from "./Contessa1.png";
import tombstone from "../cardList/tombstone64.png";
import notFound from "./not-found.png";
import GameCard from "@/lib/cardEnum";
import CardInfo from "@/components/card/CardInfo";
import CardActionTitle from "../text/cardActionTitle.component";

import "./card.styles.css";
import useGameContext from "@/context/useGameContext.js";

const Card = ({ card, onClick }) => {
  const { isTarget } = useGameContext();
  let img = notFound;
  let bgColor = "bg-cards-duke";

  let cardInfo = CardInfo[card];

  switch (card) {
    case GameCard.Duke:
      img = duke;
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
      img = captain;
      bgColor = `bg-cards-captain`;
      break;
    case GameCard.Contessa:
      img = contessa;
      bgColor = `bg-cards-contessa`;
      break;
    case GameCard.Eliminated:
      img = tombstone;
      bgColor = `bg-cards-eliminated`;
      break;
  }

  const nonTargetStyle = `card grid justify-items-center ${bgColor} border border-black px-2 py-4`;
  const targetStyle = `${nonTargetStyle} hover:bg-cards-discard hover:opacity-80`;

  if (card == GameCard.Eliminated) {
    return (
      <div className={nonTargetStyle}>
        <img className="justify-center" src={img} alt="char_icon" />
      </div>
    );
  } else {
    return (
      <div
        onClick={() => onClick()}
        className={isTarget ? targetStyle : nonTargetStyle}
      >
        <p className="text-xl font-bold">{cardInfo["character"]}</p>
        <img className="justify-center" src={img} alt="char_icon" />
        <CardActionTitle text={"Action:"} />
        <p className="font-semibold italic">
          {cardInfo["action-name"] == "" ? "N/A" : cardInfo["action-name"]}
        </p>
        <p>
          {cardInfo["action-effect"] == "" ? "N/A" : cardInfo["action-effect"]}
        </p>
        <CardActionTitle text={"Counter-action:"} />
        <p>
          {cardInfo["counteraction"] == "" ? "N/A" : cardInfo["counteraction"]}
        </p>
      </div>
    );
  }
};

export default Card;
