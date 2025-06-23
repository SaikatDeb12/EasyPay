import type React from "react";

const Profile: React.FC = () => {
  return (
    <div className="w-15 h-10 rounded-full flex items-center">
      <img
        className="w-15 h-10 bg-transparent [clip-path:circle(50%_at_50%_50%)] cursor-pointer m-2"
        src="/profile2.webp"
        alt="account"
      />
    </div>
  );
};

export default Profile;
