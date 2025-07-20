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
        <div className="flex sm:w-full max-w-full items-center justify-between rounded-lg p-2 border border-gray-300 my-4">
            <div className="flex items-center gap-2">
                <Profile />
                <p className="text-md ">{`${details.firstName} ${details.lastName}`}</p>
            </div>
            <div>
                <Button
                    bgColor="bg-blue-500"
                    textColor="text-white"
                    text="Send Money"
                    onClick={handleSendMoneyButton}
                />
            </div>
        </div>
    );
};

export default User;
