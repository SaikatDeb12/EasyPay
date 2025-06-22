import type React from "react";
import Profile from "./Profile";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

interface PropType {
  details: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const User: React.FC<PropType> = ({ details }) => {
  const navigate = useNavigate();
  const handleSendMoneyButton = () => {
    navigate(`/transfer?id=${details._id}&name=${details.firstName}`);
  };

  return (
    <div className="flex items-center justify-between my-4">
      <div className="flex">
        <Profile />
        <p className="text-md mx-8">{`${details.firstName} ${details.lastName}`}</p>
      </div>
      <div>
        <Button text="Send Money" onClick={handleSendMoneyButton} />
      </div>
    </div>
  );
};

export default User;
