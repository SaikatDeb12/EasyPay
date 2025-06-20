interface PropsType {
  text: string;
}
const Button: React.FC<PropsType> = ({ text }) => {
  return (
    <div className="w-full bg-black text-white rounded-lg px-2 py-1 font-semibold text-center mt-6 cursor-pointer">
      {text}
    </div>
  );
};

export default Button;
