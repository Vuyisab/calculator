import { useState } from "react";
import "./App.css";
import { evaluate } from "mathjs";

function App() {
  const [input, setInput] = useState("");
  const [CurrentCalculation, setCurrentCalculation] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [shouldDisplayHistory, setShouldDisplayHistory] = useState(false);

  const handleClick = (value: string) => {
    setInput((prevInput) => prevInput + value);
    setCurrentCalculation(formatBODMAS(input + value));
  };

  const handleClear = () => {
    setInput("");
    setCurrentCalculation("");
  };

  const handleCalculate = () => {
    try {
      setCurrentCalculation(formatBODMAS(input) + " = " + evaluate(input));
      if (history.length <= 2) {
        setHistory((prev) => [...prev, CurrentCalculation]);
      } else {
        setHistory((currentCalculations) => {
          const arr = currentCalculations.slice(1);
          return [...arr, CurrentCalculation];
        });
      }
    } catch (error) {
      setCurrentCalculation("Error");
    }
  };

  const formatBODMAS = (str: string) => {
    return str.replace(/([+\-*/])/g, " $1 ");
  };

  return (
    <div className="App">
      <h1>Online Calculator</h1>
      <div className="calculator">
        {shouldDisplayHistory &&
          history.map((calc, index) => (
            <div className="result" key={index}>
              {calc}
            </div>
          ))}
        <input aria-label="results" type="text" value={input} readOnly />
        <div className="result">{CurrentCalculation}</div>
        <div className="buttons">
          <button onClick={handleClear}>
            <span
              className="material-symbols-outlined"
              onClick={() => setShouldDisplayHistory(!shouldDisplayHistory)}
            >
              history
            </span>
          </button>
          <button onClick={handleClear}>AC</button>
          <button onClick={() => handleClick("*")}>*</button>
          <button onClick={() => handleClick("/")}>/</button>
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("+")}>+</button>
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("-")}>-</button>
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={handleCalculate} className="button-equals">
            =
          </button>
          <button onClick={() => handleClick("3")}>
            <span className="material-symbols-outlined">backspace</span>
          </button>
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
        </div>
      </div>
    </div>
  );
}

export default App;
