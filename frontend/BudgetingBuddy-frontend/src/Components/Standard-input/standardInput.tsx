interface Props {
  label: string;
  placeholder?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  type: string;
  options?: string[];
}

const StandardInput = ({ label, placeholder, value, onChange, type, options }: Props) => {
  return (
    <div>
      {label && <label>{label}</label>}
      {type !== "select" ? (
        <input
          type={type || "text"}
          value={value || ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <select value={value || ""} onChange={(e) => onChange(e.target.value)}>
          {options &&
            options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
        </select>
      )}
    </div>
  );
};

export default StandardInput;
