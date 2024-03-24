import useGameContext from "@/context/useGameContext.js";
import Card from "@/components/card/card.component";
import ChooseCard from "@/lib/chooseCardEnum";
import GameActions from "@/lib/actionEnum";
import GameCard from "@/lib/cardEnum";

const PlayerCards = () => {
  const {
    gameCards,
    isTarget,
    socket,
    roomId,
    responseAction,
    responseIdRef,
    currentTurnId,
    initialAction,
    initialUserId,
  } = useGameContext();

  const chooseCardType = () => {
    switch (responseAction) {
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

  /**
   *
   * @param {*} card - Card being chosen
   * @param {*} chooseActionType - Type of card selection action ex: loose/show/exchange
   * @returns
   */
  const handleChooseCard = (card) => {
    if (!isTarget) {
      return;
    }
    socket.emit("choose-card", {
      roomId: roomId,
      chooserId: currentTurnId,
      initialUserId: initialUserId,
      initialAction: initialAction,
      responseId: responseIdRef.current,
      responseAction: responseAction,
      card: card,
      chooseActionType: chooseCardType(),
    });
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
  };

  return (
    <>
      <div className="flex justify-center flex-row space-x-2">
        <Card
          className="bg-cards-duke"
          card={gameCards[0]}
          onClick={() => handleChooseCard(0)}
        ></Card>
        <Card
          className={cardClass(gameCards[1])}
          card={gameCards[1]}
          onClick={() => handleChooseCard(1)}
        ></Card>
      </div>
      {showPrompt()}
    </>
  );
};

export default PlayerCards;
