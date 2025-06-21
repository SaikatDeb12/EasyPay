import axios from "axios";
import type React from "react";
import { useEffect, useState } from "react";
import User from "../components/User";

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
    <div>
      <h1>Dashboard</h1>
      <h2>Users:</h2>
      <div>
        {list.map((user, ind) => (
          <User key={ind} details={user} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
