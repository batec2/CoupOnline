import useGameContext from "@/context/useGameContext.js";
import Card from "@/components/card/card.component";
import ChooseCard from "@/lib/chooseCardEnum";
import GameActions from "@/lib/actionEnum";
import GameCard from "@/lib/cardEnum";
import GameSectionTitle from "@/components/text/gameSectionTitle.component";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const PlayerCards = () => {
  const {
    gameCards,
    isTarget,
    socket,
    roomId,
    responseAction,
    currentTurnId,
    initialAction,
    setTurnId,
    setInitialAction,
    setInitialUserId,
    exchangeCardsRef,
  } = useGameContext();

  const [exchangeCards, setExchangeCards] = useState(null);

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
      case GameActions.Assassinate: {
        return ChooseCard.Loose;
      }
      case GameActions.CalloutLie: {
        return ChooseCard.Show;
      }
      case GameActions.BlockAssassinate: {
        return ChooseCard.Show;
      }
      case GameActions.BlockAid: {
        return ChooseCard.Show;
      }
      case GameActions.BlockStealAsAmbass: {
        return ChooseCard.Show;
      }
      case GameActions.BlockStealAsCaptain: {
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
    if (!isTarget || !exchangeCardsRef) {
      return;
    }
    console.log(
      `${currentTurnId} is choosing ${card}, ${chooseCardType()},${initialAction}`
    );
    socket.emit("choose-card", {
      roomId: roomId,
      card: card,
      chooseActionType: chooseCardType(),
    });
    setTurnId(null);
    setInitialAction(null);
    setInitialUserId(null);
  };

  const handleExchangeCard = () => {
    socket.emit("exchange-cards", {
      roomId: roomId,
      selectedCards: exchangeCards.selectedCards,
      returnedCards: exchangeCards.returnedCards,
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

  const showExchange = () => {
    if (exchangeCardsRef.current) {
      return (
        <>
          <div className="flex justify-center flex-row space-x-2">
            <Card
              className={cardClass(exchangeCardsRef.current[0])}
              card={exchangeCardsRef.current[0]}
              onClick={() => handleChooseCard(0)}
            ></Card>
            <Card
              className={cardClass(exchangeCardsRef.current[1])}
              card={exchangeCardsRef.current[1]}
              onClick={() => handleChooseCard(1)}
            ></Card>
          </div>
          <Button onClick={() => handleExchangeCard()}>
            Confirm Selection
          </Button>
        </>
      );
    }
    return;
  };

  return (
    <div className="flex flex-col space-y-2">
      <p>Your Cards:</p>
      {showPrompt()}
      <div className="flex justify-center flex-row space-x-2">
        <Card
          className={cardClass(gameCards[0])}
          card={gameCards[0]}
          onClick={() => handleChooseCard(0)}
        ></Card>
        <Card
          className={cardClass(gameCards[1])}
          card={gameCards[1]}
          onClick={() => handleChooseCard(1)}
        ></Card>
      </div>
      {showExchange()}
    </div>
  );
};

export default PlayerCards;
