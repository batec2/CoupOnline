import ambassador from "./ambassador256.png";
import assassin from "./assassin256.png";
import notFound from "./not-found.png";
import GameCard from "@/lib/cardEnum";

import "./card.styles.css";
import useGameContext from "@/context/useGameContext.js";

const Card = ({ card, onClick }) => {
  const { isTarget } = useGameContext();
  console.log(card);
  let img = notFound;

  switch (card.character) {
    case GameCard.Duke:
      img = ambassador;
      break;
    case GameCard.Assassin:
      img = assassin;
      break;
    case GameCard.Ambassador:
      img = ambassador;
      break;
    case GameCard.Captain:
      img = ambassador;
      break;
    case GameCard.Contessa:
      img = assassin;
      break;
    case GameCard.Eliminated:
      img = assassin;
      break;
  }

  const nonTargetStyle = "card border border-black px-2 py-2";
  const targetStyle = "card border border-red px-2 py-2 hover:shadow-lg";

  return (
    <div
      onClick={() => onClick()}
      className={isTarget ? targetStyle : nonTargetStyle}
    >
      <h4>{card.character}</h4>
      <img src={img} alt="char_icon" />
      <h5>Action</h5>
      <h6>{card["action-name"] == "" ? "N/A" : card["action-name"]}</h6>
      <p>{card["action-effect"] == "" ? "N/A" : card["action-effect"]}</p>
      <h5>Counteraction</h5>
      <p>{card["counteraction"] == "" ? "N/A" : card["counteraction"]}</p>
    </div>
  );
};

export default Card;
