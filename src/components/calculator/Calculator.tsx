import { useState } from "react";
import CalculationResult from "../calculation-results/CalculationResult";
import Button from "../button/Button";
import "./calculator.css";
import { evaluate } from "mathjs";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [CurrentCalculation, setCurrentCalculation] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [isNewCalculation, setIsNewCalculation] = useState(true);
  const [displayHistory, setDisplayHistory] = useState(false);
  const calculationsToDisplay = history.slice(-2);
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
      setCurrentCalculation(
        formatBODMAS(input) + " = " + evaluate(formatBODMAS(input)).toString()
      );
      setHistory((prev) => [...prev, CurrentCalculation]);
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
        {!displayHistory
          ? calculationsToDisplay.map((calc, index) => (
              <CalculationResult
                key={index}
                result={`${calc} = ${evaluate(calc)}`}
              />
            ))
          : history.map((calc, index) => (
              <CalculationResult
                key={index}
                result={`${calc} = ${evaluate(calc)}`}
              />
            ))}
        {!displayHistory && (
          <div className="result current-result">
            <h2>{CurrentCalculation}</h2>
          </div>
        )}

        <div className="buttons">
          {!displayHistory ? (
            buttons.map((button) => (
              <Button
                label={button}
                onClick={() => {
                  switch (button) {
                    case "AC":
                      handleClear();
                      break;
                    case "history":
                      setDisplayHistory(!displayHistory);
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
            ))
          ) : (
            <>
              <Button
                label="history"
                onClick={() => setDisplayHistory(!displayHistory)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;
