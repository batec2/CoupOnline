import useGameContext from "@/context/useGameContext.js";
import CardInfo from "@/components/card/CardInfo";
import Card from "@/components/card/card.component";
import { handleChooseCard } from "@/actions/socketActions";
import ChooseCard from "@/lib/chooseCardEnum";
import GameActions from "@/lib/actionEnum";

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

  return (
    <>
      <div className="flex">
        <Card
          card={CardInfo[gameCards[0]]}
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
          card={CardInfo[gameCards[1]]}
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
