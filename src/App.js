import "./App.css";
import React from "react";
import { Die } from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const generateNewDie = () => {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  };

  const [dice, setDice] = React.useState(allNewDice());

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allSameHeld = dice.every((die) => die.isHeld === true);
    const allValueSame = dice.every((die) => die.value === dice[0].value);

    if (allSameHeld && allValueSame) {
      setTenzies(true);
      console.log("You Won!");
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const rollDice = () => {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice);
    } else {
      setDice((oldDice) => {
        return oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        });
      });
    }
  };

  const holdDice = (id) => {
    setDice((prevDice) => {
      return prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      );
    });
  };

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="App w-full h-screen p-5 bg-gray-900 flex justify-center items-center">
      <div className="bg-orange-100 h-96 max-w-[800px] p-4 m-auto rounded-md flex flex-col justify-around items-center">
        {tenzies && <Confetti />}

        <h1 className="font-bold text-2xl tracking-[-0.03em]">Tenzies</h1>
        <p className="text-sm tracking-tight">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>

        <div className="grid grid-cols-5 gap-5 text-center">{diceElements}</div>

        <button
          onClick={rollDice}
          className="bg-blue-700  text-lg font-semibold text-white py-2 px-10 rounded shadow-md"
        >
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </div>
  );
}

export default App;
