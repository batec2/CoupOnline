import useGameContext from "@/context/useGameContext.js";
import Card from "@/components/card/card.component";
import { handleChooseCard } from "@/actions/socketActions";
import ChooseCard from "@/lib/chooseCardEnum";
import GameActions from "@/lib/actionEnum";
import GameCard from "@/lib/cardEnum";

const PlayerCards = () => {
  const { gameCards, isTarget, socket, roomId, requestAction, requestIdRef } =
    useGameContext();

  const chooseCardType = () => {
    switch (requestAction) {
      case GameActions.Coup: {
        return ChooseCard.Loose;
      }
      case GameActions.LooseCallout: {
        return ChooseCard.Loose;
      }
      case GameActions.Exchange: {
        return ChooseCard.Exchange;
      }
      case GameActions.CalloutLie: {
        return ChooseCard.Show;
      }
    }
  };

  const showPrompt = () => {
    if (isTarget) {
      return <p className="font-bold">Please Select a Card to Lose</p>;
    }
  };

  const cardClass = (card) => {
    switch (card) {
      case GameCard.Duke: {
        return "bg-cards-duke";
      }
      case GameCard.Assassin: {
        return "bg-cards-assassin";
      }
      case GameCard.Ambassador: {
        return "bg-cards-ambassador";
      }
      case GameCard.Captain: {
        return "bg-cards-captain";
      }
      case GameCard.Contessa: {
        return "bg-cards-contessa";
      }
      default: {
        return "bg-actions-normal";
      }
    } 
  }

  return (
    <>
      <div className="flex">
          <Card
            className="bg-cards-duke"
            card={gameCards[0]}
            onClick={() =>
              handleChooseCard(
                socket,
                roomId,
                0,
                isTarget,
                requestIdRef.current,
                requestAction,
                chooseCardType()
              )
            }
          ></Card>
          <Card
            className={cardClass(gameCards[1])}
            card={gameCards[1]}
            onClick={() =>
              handleChooseCard(
                socket,
                roomId,
                1,
                isTarget,
                requestIdRef.current,
                requestAction,
                chooseCardType()
             )
            }
          ></Card>
      </div>
      {showPrompt()}
    </>
  );
};

export default PlayerCards;
