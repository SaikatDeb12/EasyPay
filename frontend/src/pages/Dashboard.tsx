import axios from "axios";
import { useEffect, useState } from "react";
import Profile from "../components/Profile";
import InputBox from "../components/InputBox";
import User from "../components/User";
import Button from "../components/Button";

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const Dashboard: React.FC = () => {
  const [list, setList] = useState<UserType[]>([]);
  const [balance, setBalance] = useState<number>(0);

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
    const fetchBalance = async () => {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        (import.meta.env.VITE_BASE_URL as string) + "/api/v1/account/balance",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBalance(Number(res.data.msg));
    };
    fetchBalance();
    fetchData();
  }, []);

  const handleOnChange = () => {};

  return (
    <div className="w-full h-screen">
      <div className="w-full flex justify-between items-center h-fit border-gray-400 shadow-lg ">
        <div className="text-2xl mx-2 font-normal">Easy Pay</div>
        <div className="flex m-2 items-center">
          <p>Hello</p>
          <Profile />
        </div>
      </div>
      <div className="m-8 space-y-10">
        <div>
          <h2 className="font-bold text-xl">Your current balance: </h2>
          <h4 className="text-md">{`Rs. ${balance}`}</h4>
        </div>
        <div>
          <h2 className="text-xl font-bold">Users</h2>
          <InputBox
            label=""
            name="search"
            placeholder="Search users..."
            type="text"
            onChange={handleOnChange}
          />
          <div>
            {list.map((user, ind) => (
              <User key={ind} details={user} />
            ))}
          </div>
        </div>
      </div>
      {/* <div>
      </div> */}
    </div>
  );
};

export default Dashboard;
