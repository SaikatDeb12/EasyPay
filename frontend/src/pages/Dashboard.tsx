import axios from "axios";
import { useEffect, useState } from "react";
import Profile from "../components/Profile";
import InputBox from "../components/InputBox";
import User from "../components/User";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const Dashboard: React.FC = () => {
  const [list, setList] = useState<UserType[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const [filter, setFilter] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string>("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      setLoading(false);
    }

    const fetchData = async () => {
      const res = await axios.get(
        (import.meta.env.VITE_BASE_URL as string) +
          "/api/v1/user/bulk?filter=" +
          filter,
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

      setBalance(Number(res.data.amount));
      setCurrentUserId(res.data.currentUserId);
    };
    fetchBalance();
    fetchData();
  }, [filter, navigate]);

  return loading ? (
    <Loading />
  ) : (
    <div className="w-full h-screen ">
      <div className="w-full flex justify-between items-center h-fit border-gray-400 shadow-lg ">
        <div
          className="text-2xl text-blue-500 p-4 mx-2 font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Easy Pay
        </div>
        <div className="flex m-2 items-center">
          <p
            className="font-semibold text-blue-500 cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </p>
          <Profile />
        </div>
      </div>
      <div className="w-full">
        <div className="m-8 space-y-10 ">
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
              {list.map(
                (user, ind) =>
                  user._id != currentUserId && <User key={ind} details={user} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
