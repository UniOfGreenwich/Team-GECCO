import { FC } from "react";
import "./stepper.scss";
import tick from "../../assets/tick.svg";

interface Props {
  steps: number;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  stepTitles?: string[];
}

const Stepper: FC<Props> = ({
  steps,
  currentIndex,
  setCurrentIndex,
  stepTitles,
}) => {
  const stepsArray = [];

  for (let i: number = 0; i < steps; i++) {
    const containerStateClass =
      currentIndex === i
        ? "active"
        : i < currentIndex
          ? "completed"
          : "disabled";

    const isButtonDisabled = currentIndex < i;

    const button = (
      <button
        onClick={() => !isButtonDisabled && setCurrentIndex(i)}
        disabled={isButtonDisabled}
        className={`step-button`}
      >
        {i < currentIndex ? (
          <img className="tick-image" src={tick} alt="Completed" />
        ) : (
          i + 1
        )}
      </button>
    );

    stepsArray.push(
      <div key={i} className={`step-container ${containerStateClass}`}>
        {button}
        {stepTitles && stepTitles[i] && (
          <div className="step-title">{stepTitles[i]}</div>
        )}
        {i !== steps - 1 && <div className="connector"></div>}
      </div>,
    );
  }

  return <div className="stepper">{stepsArray}</div>;
};

export default Stepper;
