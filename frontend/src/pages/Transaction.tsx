import type React from "react";
import Heading from "../components/Heading";
import Profile from "../components/Profile";
import { useNavigate, useSearchParams } from "react-router-dom";
import InputBox from "../components/InputBox";
import { useEffect, useState } from "react";
import axios from "axios";

const Transaction: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const id = params.get("id");
  const name = params.get("name");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    } else {
      setIsLoading(false);
    }

    async function validate() {
      const response = await axios.get(
        (import.meta.env.VITE_BASE_URL as string) + "/api/v1/home"
      );
      if (response.data.msg != "welcome") {
        navigate("/signin");
      }
    }
    validate();
  }, [navigate]);

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const initiateTransfer = async () => {
    const value = {
      to: id,
      amount: amount,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        (import.meta.env.VITE_BASE_URL as string) + "/api/v1/account/transfer",
        value,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.msg);
      navigate("/dashboard");
    } catch (err) {
      console.log("error: ", err);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-slate-300">
      <div className="w-90 space-y-4 bg-white rounded-lg h-max px-4 p-2 pb-10 ">
        <div className="flex flex-col justify-center items-center mb-8">
          <Heading color="text-black" label="Send Money" />
        </div>
        <div className="flex items-center ">
          <Profile />
          <h2 className="px-2 text-lg font-semibold">{name}</h2>
        </div>
        <div className="mx-6">
          <p>Amount (in Rs.)</p>
          <InputBox
            onChange={handleAmount}
            placeholder="Enter amount"
            type="number"
          />
          <button
            onClick={initiateTransfer}
            type="submit"
            className="w-full bg-black hover:bg-green-500 transition delay-50 text-white rounded-lg px-3 py-1 shadow-md hover:shadow-lg ease-in-out font-semibold text-center mt-6 cursor-pointer"
          >
            Initial Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
