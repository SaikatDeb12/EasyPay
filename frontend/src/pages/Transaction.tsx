import type React from "react";
import Heading from "../components/Heading";
import Profile from "../components/Profile";
import { useSearchParams } from "react-router-dom";
import InputBox from "../components/InputBox";

const Transaction: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const id = params.get("id");
  const name = params.get("name");

  const handleAmount = () => {};

  return (
    <div className="h-screen w-full flex justify-center items-center bg-slate-300">
      <div className="w-90 space-y-4 bg-white rounded-lg h-max px-4 p-2 pb-10 ">
        <div className="flex flex-col justify-center items-center mb-8">
          <Heading label="Send Money" />
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
            onClick={handleAmount}
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
