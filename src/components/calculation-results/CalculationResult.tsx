import "./calculation-results.css";

interface CalculationResultProps {
  result: string;
}

const CalculationResult = ({ result }: CalculationResultProps) => {
  return (
    <div className="result">
      <h4>{result}</h4>
    </div>
  );
};

export default CalculationResult;
