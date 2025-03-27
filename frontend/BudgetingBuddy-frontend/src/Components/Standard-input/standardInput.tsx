interface Props {
  label: string;
  placeholder?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  type: string;
  options?: string[];
  required: boolean
}

const StandardInput = ({
  label,
  placeholder,
  value,
  onChange,
  type,
  options,
  required
}: Props) => {
  return (
    <div>
      {label && <label>{label}</label>}
      {type !== "select" ? (
        <input
          type={type || "text"}
          value={value || ""}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        />
      ) : (
        <select
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          required={required}
        >
          <option value="" disabled>
            Select {label}
          </option>
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
