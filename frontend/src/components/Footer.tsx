import type React from "react";

interface PropsType {
  msg: string;
  redirect: string;
}
const Footer: React.FC<PropsType> = ({ msg, redirect }) => {
  return (
    <div className="my-4">
      <span>{msg}</span>
      <span className="font-semibold underline decoration-1 cursor-pointer">
        {redirect}
      </span>
    </div>
  );
};

export default Footer;
