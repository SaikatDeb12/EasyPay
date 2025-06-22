import type React from "react";

interface PropsType {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const Button: React.FC<PropsType> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="w-full bg-black text-white rounded-lg px-3 py-1 shadow-md hover:shadow-lg ease-in-out font-semibold text-center mt-6 cursor-pointer"
    >
      {text}
    </button>
  );
};

export default Button;
