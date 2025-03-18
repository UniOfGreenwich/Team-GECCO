interface Props {
  label: string;
  placeholder?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  type: string | undefined;
}

const StandardInput = ({label, placeholder, value, onChange, type}: Props) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default StandardInput;
