import type React from "react";

interface PropType {
  details: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const User: React.FC<PropType> = ({ details }) => {
  return <div>{`${details.firstName} ${details.lastName}`}</div>;
};

export default User;
