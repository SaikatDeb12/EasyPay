import type React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface PropsType {
  msg: string;
  redirect: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const Footer: React.FC<PropsType> = ({ msg, redirect, onClick }) => {
  return (
    <div className="mx-10 w-full my-2 space-y-4">
      <div className="flex justify-center items-center">
        <p className="text-stone-600">or continue with</p>
      </div>
      <div className="flex justify-evenly">
        <FaGithub className="border-2 border-stone-300 w-40 cursor-pointer hover:border-blue-400 h-8 py-1 text-stone-500 bg-transparent rounded-lg" />
        <FaGoogle className="border-2 border-stone-300 w-40 cursor-pointer hover:border-blue-400 h-8 py-1 text-stone-500 bg-transparent rounded-lg" />
      </div>
      <div className="text-center">
        <span>{msg}</span>
        <span
          className="font-semibold text-blue-400 underline decoration-1 cursor-pointer"
          onClick={onClick}
        >
          {redirect}
        </span>
      </div>
    </div>
  );
};

export default Footer;
