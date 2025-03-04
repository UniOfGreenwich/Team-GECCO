import { FC } from "react";
import "./stepper.scss";
import tick from '../../Assets/tick.svg';


interface Props {
  steps: number;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const Stepper: FC<Props> = ({ steps, currentIndex, setCurrentIndex }) => {
  const stepsArray = [];

  for (let i: number = 0; i < steps; i++) {
    const button = (
      <button
        onClick={() => setCurrentIndex(i)}
        disabled={currentIndex < i}
        className={`step-button ${
          currentIndex === i
            ? "active"
            : i < currentIndex
            ? "completed"
            : "disabled"
        }`}
      >{i >= currentIndex ? i + 1 : <img  className='tick-image' src={tick}></img>}</button>
    );

    stepsArray.push(
      <div key={i} className="step-container">
        {button}
        {i !== steps - 1 && <div className="connector"></div>}
      </div>
    );
  }

  return <div className="stepper">{stepsArray}</div>;
};

export default Stepper;
