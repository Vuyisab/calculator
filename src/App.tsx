import { useState } from "react";
import "./App.css";
import { evaluate } from "mathjs";
import Button from "./components/Button";
import CalculationResult from "./components/calculation-results/CalculationResult";

function App() {
  const [input, setInput] = useState("");
  const [CurrentCalculation, setCurrentCalculation] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [isNewCalculation, setIsNewCalculation] = useState(true);
  const buttons = [
    "history",
    "AC",
    "*",
    "/",
    "7",
    "8",
    "9",
    "+",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "=",
    "backspace",
    "0",
    ".",
  ];

  const handleClick = (value: string) => {
    const operators = ["+", "-", "*", "/"];
    if (isNewCalculation && CurrentCalculation.length > 0) {
      const calculationValue = operators.includes(value)
        ? evaluate(input) + value
        : value;
      setCurrentCalculation(formatBODMAS(calculationValue));
      setInput(calculationValue);
      setIsNewCalculation(false);
    } else {
      setInput(input + value);
      setCurrentCalculation(formatBODMAS(input + value));
    }
  };

  const handleClear = () => {
    setInput("");
    setCurrentCalculation("");
  };

  const handleDelete = () => setCurrentCalculation((calc) => calc.slice(0, -1));

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
      setIsNewCalculation(true);
    } catch (error) {
      setCurrentCalculation("Error");
      setIsNewCalculation(true);
    }
  };

  const formatBODMAS = (str: string) => {
    return str.replace(/([+\-*/])/g, " $1 ");
  };

  return (
    <div className="App">
      <div className="calculator">
        {history.map((calc, index) => (
          <CalculationResult
            key={index}
            result={`${calc} = ${evaluate(calc)}`}
          />
        ))}
        <div className="result current-result">
          <h2>{CurrentCalculation}</h2>
        </div>
        <div className="buttons">
          {buttons.map((button) => (
            <Button
              label={button}
              onClick={() => {
                switch (button) {
                  case "AC":
                  case "history":
                    handleClear();
                    break;
                  case "backspace":
                    handleDelete();
                    break;
                  case "=":
                    handleCalculate();
                    break;
                  default:
                    handleClick(button);
                    break;
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
