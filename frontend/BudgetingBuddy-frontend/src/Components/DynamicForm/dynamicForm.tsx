import { useState, FormEvent, useEffect } from "react";
import StandardInput from "../Standard-input/standardInput";

interface FormField {
  label: string;
  type: string;
  UniqueId: string;
  value?: string
}

interface DynamicFormProps {
  formValues: FormField[];
  onFormSubmit: (formData: Record<string, string>) => void;
  options?: string[];
  className?: string;
  dontClearFields?: boolean;
  buttonName: string;
}

const DynamicForm = (Props: DynamicFormProps) => {
  const { formValues, onFormSubmit, options, className, dontClearFields, buttonName } = Props;
  const [formInputtedValues, setFormInputtedValues] = useState<
    Record<string, string>
  >({});

  const handleChange = (value: string, UniqueId: string) => {
    setFormInputtedValues((prev) => ({
      ...prev,
      [UniqueId]: value,
    }));
  };

  useEffect(() => {
    console.log(formInputtedValues)
    console.log(formValues.forEach(field => {
      console.log(field.UniqueId)
    }))
  },[formValues, formInputtedValues])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFormSubmit(formInputtedValues);

    const clearedState: Record<string, string> = {};
    if(!dontClearFields){
      formValues.forEach(field => {
        clearedState[field.UniqueId] = '';
      });
    }
    setFormInputtedValues(prevState => ({ ...prevState, ...clearedState })); 
  };

   const formClassName = `dynamic-form ${className || ''}`.trim(); 

  return (
    <form onSubmit={handleSubmit} className={formClassName}>
      {formValues.map((input: FormField) => (
        <StandardInput
          key={input.UniqueId}
          label={input.label}
          type={input.type}
          value={input.value || ""}
          onChange={(value) => handleChange(value, input.UniqueId)}
          options={options}
          required={true} 
        />
      ))}
      <button type="submit">{buttonName}</button>
    </form>
  );
};

export default DynamicForm;
