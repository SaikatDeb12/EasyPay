import type React from "react";
import Heading from "../components/Heading";
import Profile from "../components/Profile";
import { useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import Button from "../components/Button";

const Transaction: React.FC = () => {
  const params = new URLSearchParams(document.location.search);
  const [amount, setAmount] = useState<number>(100);
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
    setAmount(event.target.valueAsNumber);
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
      toast.success(response.data.msg);
      navigate("/dashboard");
    } catch (error) {
      const err = error as AxiosError;
      const data = err.response?.data as { msg: string };
      toast.error(data.msg);
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
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
          <Button
            bgColor="bg-green-500"
            textColor="text-white"
            onClick={initiateTransfer}
            text="Initial Transfer"
          />
        </div>
      </div>
    </div>
  );
};

export default Transaction;
