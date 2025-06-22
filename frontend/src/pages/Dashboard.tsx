import axios from "axios";
import type React from "react";
import { useEffect, useState } from "react";
import User from "../components/User";
import Profile from "../components/Profile";

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const Dashboard: React.FC = () => {
  const [list, setList] = useState<UserType[]>([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      const res = await axios.get(
        (import.meta.env.VITE_BASE_URL as string) + "/api/v1/user/bulk",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setList(res.data.users);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="w-full flex justify-between border ">
        <div className="text-xl m-2">Easy Pay</div>
        <div className="flex m-2 items-center">
          <p>Hello</p>
          <Profile />
        </div>
      </div>
      {/* <div>
        {list.map((user, ind) => (
          <User key={ind} details={user} />
        ))}
      </div> */}
    </div>
  );
};

export default Dashboard;
