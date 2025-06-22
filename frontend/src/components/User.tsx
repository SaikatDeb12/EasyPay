import type React from "react";
import Profile from "./Profile";
import Button from "./Button";

interface PropType {
  details: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const User: React.FC<PropType> = ({ details }) => {
  return (
    <div className="flex items-center justify-between my-4">
      <div className="flex">
        <Profile />
        <p className="text-md mx-8">{`${details.firstName} ${details.lastName}`}</p>
      </div>
      <div>
        <Button text="Send Money" />
      </div>
    </div>
  );
};

export default User;
