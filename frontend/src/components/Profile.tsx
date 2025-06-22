import type React from "react";

// interface display {
//   char: string;
// }
const Profile: React.FC = () => {
  return (
    <div className="w-25 h-25 rounded-full">
      <img
        className="w-15 h-10 bg-transparent [clip-path:circle(50%_at_50%_50%)] cursor-pointer m-2"
        src="/profile.jpg"
        alt="account"
      />
    </div>
  );
};

export default Profile;
