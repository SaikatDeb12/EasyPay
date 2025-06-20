interface PropType {
  name: string;
  label: string;
  placeholder: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputBox: React.FC<PropType> = ({
  name,
  label,
  placeholder,
  type,
  onChange,
}) => {
  return (
    <div className="my-2">
      <label className="font-semibold">{label}</label>
      <input
        name={name}
        className="w-full my-1 rounded-lg border border-gray-500 px-2 py-1"
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
