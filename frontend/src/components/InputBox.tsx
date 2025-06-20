interface PropType {
  label: string;
  placeholder: string;
  type: string;
}
const InputBox: React.FC<PropType> = ({ label, placeholder, type }) => {
  return (
    <div className="my-2">
      <label className="font-semibold">{label}</label>
      <input
        className="w-full my-1 rounded-lg border border-gray-500 px-2 py-1"
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};

export default InputBox;
