// Calculator.tsx
import React, { useState } from "react";
import Button from "./Button";
import Display from "./Display";

const Calculator: React.FC = () => {
  const [currentCalculation, setCurrentCalculation] = useState<string>("");
  const [history] = useState<string[]>([]);

  const handleDigit = (digit: string) => {
    setCurrentCalculation(currentCalculation + digit);
  };

  // Add more handlers for operations, equals, delete, and clear

  return (
    <div>
      <Display currentCalculation={currentCalculation} history={history} />
      <div className="buttons">
        {/* Numbers */}
        {[...Array(10).keys()].map((number) => (
          <Button
            key={number}
            label={String(number)}
            onClick={() => handleDigit(String(number))}
          />
        ))}
        {/* Operations */}
        <Button
          label="+"
          onClick={() => {
            /* Implement */
          }}
        />
        <Button
          label="-"
          onClick={() => {
            /* Implement */
          }}
        />
        {/* Equals, Delete, Clear */}
        <Button
          label="="
          onClick={() => {
            /* Implement */
          }}
        />
        <Button
          label="C"
          onClick={() => {
            /* Implement */
          }}
        />
        <Button
          label="Del"
          onClick={() => {
            /* Implement */
          }}
        />
        {/* Placeholder Buttons for *, /, and . */}
        <Button
          label="*"
          onClick={() => {
            /* Implement if needed */
          }}
        />
        <Button
          label="/"
          onClick={() => {
            /* Implement if needed */
          }}
        />
        <Button
          label="."
          onClick={() => {
            /* Implement if needed */
          }}
        />
      </div>
    </div>
  );
};

export default Calculator;
