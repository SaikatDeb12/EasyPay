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
      className="w-full bg-blue-500 text-white rounded-lg px-3 py-2 hover:shadow-sm shadow-md shadow-black ease-in-out font-semibold text-center cursor-pointer delay-75"
    >
      {text}
    </button>
  );
};

export default Button;
