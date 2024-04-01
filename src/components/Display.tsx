interface DisplayProps {
  currentCalculation: string;
  history: string[];
}

const Display: React.FC<DisplayProps> = ({ currentCalculation, history }) => {
  return (
    <div>
      <div className="history">
        {history.map((calc, index) => (
          <div key={index}>{calc}</div>
        ))}
      </div>
      <div className="currentCalculation">{currentCalculation}</div>
    </div>
  );
};

export default Display;
