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
      <div className="calculator">
        {shouldDisplayHistory &&
          history.map((calc, index) => (
            <div className="result" key={index}>
              {`${calc} = ${evaluate(calc)}`}
            </div>
          ))}
        <div className="result current-result">{CurrentCalculation}</div>
        <div className="buttons">
          <button onClick={handleClear} className="purple">
            <span
              className="material-symbols-outlined"
              onClick={() => setShouldDisplayHistory(!shouldDisplayHistory)}
            >
              history
            </span>
          </button>
          <button onClick={handleClear} className="purple">
            AC
          </button>
          <button onClick={() => handleClick("*")} className="purple">
            *
          </button>
          <button onClick={() => handleClick("/")} className="purple">
            /
          </button>
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
          <button onClick={() => handleClick("+")} className="purple">
            +
          </button>
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("-")} className="purple">
            -
          </button>
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={handleCalculate} className="button-equals purple">
            =
          </button>
          <button onClick={() => handleClick("x")}>
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
