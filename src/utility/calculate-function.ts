export const calculate = (expression: string) => {
  // Split the expression into parts
  const parts = expression.split(" ");
  let result = 0;
  let currentOperation = "+";

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    if (part === "+" || part === "-") {
      // If the part is an operator, set currentOperation to that operator
      currentOperation = part;
    } else {
      // If the part is a number, calculate based on the currentOperation
      const number = parseFloat(part);
      if (isNaN(number)) {
        throw new Error("Invalid number in expression.");
      }

      if (currentOperation === "+") {
        result += number;
      } else if (currentOperation === "-") {
        result -= number;
      }
    }
  }

  return result;
};
