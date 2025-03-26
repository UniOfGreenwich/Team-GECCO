import { useState, FormEvent } from "react";
import StandardInput from "../Standard-input/standardInput";

interface FormField {
  label: string;
  type: string;
  UniqueId: string;
}

interface DynamicFormProps {
  formValues: FormField[];
  onFormSubmit: (formData: Record<string, string>) => void;
  options?: string[];
}

const DynamicForm = (Props: DynamicFormProps) => {
  const { formValues, onFormSubmit, options } = Props;
  const [formInputtedValues, setFormInputtedValues] = useState<
    Record<string, string>
  >({});

  const handleChange = (value: string, UniqueId: string) => {
    setFormInputtedValues((prev) => ({
      ...prev,
      [UniqueId]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFormSubmit(formInputtedValues);
    setFormInputtedValues({});
  };

  return (
    <form onSubmit={handleSubmit}>
      {formValues.map((input: FormField) => (
        <StandardInput
          key={input.UniqueId}
          label={input.label}
          type={input.type}
          value={formInputtedValues[input.UniqueId] || ""}
          onChange={(value) => handleChange(value, input.UniqueId)}
          options={options}
        />
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;