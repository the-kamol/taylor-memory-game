import { useEffect, useState } from "react";
import "./App.css";
import { SingleCard } from "./components/SingleCard";
import album_1 from "./assets/images/albums/1989.webp";
import album_2 from "./assets/images/albums/evermore.webp";
import album_3 from "./assets/images/albums/fearless.jpeg";
import album_4 from "./assets/images/albums/lover.jpeg";
import album_5 from "./assets/images/albums/red.jpeg";
import album_6 from "./assets/images/albums/reputation.jpeg";

const cardImages = [
  { src: album_1, matched: false },
  { src: album_2, matched: false },
  { src: album_3, matched: false },
  { src: album_4, matched: false },
  { src: album_5, matched: false },
  { src: album_6, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort((e) => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1300);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <div className="head">
        <h1>Taylor Memory Game</h1>
        <button onClick={shuffleCards}>New Game</button>
      </div>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>
        Turns: <strong>{turns}</strong>
      </p>
    </div>
  );
}

export default App;
