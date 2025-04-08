import StandardInput from "../Standard-input/standardInput";
import Stepper from "../Stepper/stepper";
import "./calculator.scss";

interface InputFieldConfig {
  label: string;
  placeholder?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  type: string;
  options?: string[];
  required: boolean;
}

interface CalcConfiguration {
  stepTitle?: string;
  stepInfo?: string;
  inputFields: InputFieldConfig[];
  onStepComplete?: (...args: any[]) => void;
  buttonName?: string;
}

interface Props {
  calcConfig: CalcConfiguration[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  steps: number;
}

function Calculator(props: Props) {
  const { calcConfig, currentIndex, setCurrentIndex, steps } = props;
  const currentStep = calcConfig[currentIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep?.onStepComplete) {
      currentStep.onStepComplete();
    }
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="calculator-container">
      <Stepper
        steps={steps}
        setCurrentIndex={setCurrentIndex}
        currentIndex={currentIndex}
      />

      {currentStep?.stepTitle && <h3>{currentStep.stepTitle}</h3>}
      {currentStep?.stepInfo && <p>{currentStep.stepInfo}</p>}

      <form onSubmit={handleSubmit} className="calculator-form">
        {currentStep?.inputFields.map((field, index) => (
          <div key={`input-${index}`} className="input-field-container">
            <StandardInput
              label={field.label}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              type={field.type}
              options={field.options}
              required={field.required}
            />
          </div>
        ))}
        <button type="submit" className="calculator-submit-button">
          {currentStep?.buttonName || "Next"}
        </button>
      </form>
    </div>
  );
}

export default Calculator;
