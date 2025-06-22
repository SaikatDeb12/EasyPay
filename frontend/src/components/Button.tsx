interface PropsType {
  text: string;
}
const Button: React.FC<PropsType> = ({ text }) => {
  return (
    <button
      type="submit"
      className="w-full bg-black text-white rounded-lg px-2 py-1 shadow-md hover:shadow-lg ease-in-out font-semibold text-center mt-6 cursor-pointer"
    >
      {text}
    </button>
  );
};

export default Button;
