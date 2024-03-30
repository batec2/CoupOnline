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
    exchangeCards,
    setExchangeCards,
  } = useGameContext();

  const [currentSelected, setCurrentSelected] = useState(0);
  const [selectedCards, setSelectedCards] = useState([
    false,
    false,
    false,
    false,
  ]);

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
  const handleChooseCard = (card, cardNumber) => {
    if (isTarget) {
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
      return;
    } else if (exchangeCards) {
      setCurrentSelected(
        selectedCards[cardNumber] ? currentSelected - 1 : currentSelected + 1
      );
      const cards = selectedCards;
      cards[cardNumber] = !selectedCards[cardNumber];
      setSelectedCards(cards);
    }
  };

  const handleExchangeCard = () => {
    console.log(currentSelected);
    if (currentSelected === 2) {
      const chosenCards = [];
      const returnedCards = [];
      for (let i = 0; i < 4; i++) {
        if (i < 2) {
          if (!selectedCards[i]) {
            chosenCards.push(gameCards[i]);
          } else {
            returnedCards.push(gameCards[i]);
          }
        } else {
          if (!selectedCards[i]) {
            chosenCards.push(exchangeCards[i - 2]);
          } else {
            returnedCards.push(exchangeCards[i - 2]);
          }
        }
      }
      socket.emit("exchange-cards", {
        roomId: roomId,
        chosenCards: chosenCards,
        returnedCards: returnedCards,
      });
      setExchangeCards(null);
      setCurrentSelected(0);
      setSelectedCards([false, false, false, false]);
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
  };

  const showExchange = () => {
    if (exchangeCards) {
      return (
        <>
          <div className="flex justify-center flex-row space-x-2">
            <Card
              className={cardClass(exchangeCards[0])}
              card={exchangeCards[0]}
              active={selectedCards}
              number={2}
              onClick={() => handleChooseCard(0, 2)}
            ></Card>
            <Card
              className={cardClass(exchangeCards[1])}
              card={exchangeCards[1]}
              active={selectedCards}
              number={3}
              onClick={() => handleChooseCard(1, 3)}
            ></Card>
          </div>
          <Button
            className={currentSelected === 2 ? "bg-green-700" : "bg-gray-500"}
            onClick={() => handleExchangeCard()}
          >
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
          active={selectedCards}
          number={0}
          onClick={() => handleChooseCard(0, 0)}
        ></Card>
        <Card
          className={cardClass(gameCards[1])}
          card={gameCards[1]}
          active={selectedCards}
          number={1}
          onClick={() => handleChooseCard(1, 1)}
        ></Card>
      </div>
      {showExchange()}
    </div>
  );
};

export default PlayerCards;
