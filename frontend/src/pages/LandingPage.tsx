import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { MdOutlineDoneOutline } from "react-icons/md";
import { TbCircleNumber1Filled } from "react-icons/tb";
import { TbCircleNumber2Filled } from "react-icons/tb";
import { TbCircleNumber3Filled } from "react-icons/tb";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function checkAuth() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoading(false);
          return;
        }
        const res = await axios.get(
          (import.meta.env.VITE_BASE_URL as string) + "/api/v1/home",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.msg == "welcome") {
          navigate("/landing");
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, [navigate]);
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div className="w-full h-screen">
      <div className="w-full z-10 sticky bg-white flex justify-between items-center h-fit border-gray-400 shadow-lg ">
        <div className="text-2xl mx-4 p-4 font-bold text-blue-500">
          Easy Pay
        </div>
        <div className="flex items-center mr-10 ">
          <Button text="Dashboard" onClick={() => navigate("/dashboard")} />
        </div>
      </div>
      <div className="bg-blue-100 z-0 h-150 flex justify-between items-center">
        <div className="mx-10 space-y-3">
          <div className="space-x-3 text-black text-5xl font-bold">
            <span>Send & Receive Money</span>
            <span className="text-blue-500">Instantly</span>
          </div>
          <div className="w-110 text-gray-700 space-y-3">
            <p>
              The fastest and most secure way to transfer money. Join to explore
              the true potential
            </p>
            <Button
              text="Start Sending Money ->"
              onClick={() => navigate("/dashboard")}
            />
            <div className="flex text-sm space-x-5">
              <div className="flex items-center space-x-1">
                <MdOutlineDoneOutline />
                <p>No setup fees</p>
              </div>
              <div className="flex items-center space-x-1">
                <MdOutlineDoneOutline />
                <p>Instant transfer</p>
              </div>
              <div className="flex items-center space-x-1">
                <MdOutlineDoneOutline />
                <p>24/7 support</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <img
            className="h-70 w-100 m-auto rounded-lg shadow-2xl"
            src="/transfer.jpg"
            alt="cards"
          />
        </div>
      </div>
      <div className="h-150 w-full flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <Heading
            label="Everything you need for digital payments"
            color="text-black"
          />
          <p className="text-gray-600 text-center w-150">
            From instant transfers to secure transactions, EasyPay provides most
            of the tool you need for seamless money management
          </p>
          <div className="grid md:grid-cols-3 md:grid-rows-1 grid-cols-1 grid-rows-3 text-center gap-4 space-x-4 m-auto w-200 mt-10">
            <div className="border-2 border-blue-50 px-4 py-3 rounded-sm">
              <p className="text-md font-bold space-y-1 px-2  ">
                Instant Transfer
              </p>
              <p className="text-sm text-gray-500">
                Send money to anyone in seconds. No waiting, no delays
              </p>
            </div>
            <div className="border-2 border-blue-50 px-3 py-2 rounded-sm">
              <p className="text-md font-bold space-y-1 px-2 ">
                Bank-Level Security
              </p>
              <p className="text-sm text-gray-500">
                Your money is protected with proper encryption
              </p>
            </div>
            <div className="border-2 border-blue-50 px-3 py-2 rounded-sm">
              <p className="text-md font-bold space-y-1 px-2 ">
                Interactive UI
              </p>
              <p className="text-sm text-gray-500">
                Enjoy the smooth money transfer, just like our UI
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-150 bg-gray-200 w-full flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <Heading label="How EasyPay Works" color="text-black" />
          <p className="text-gray-600 text-center w-150">
            Get started in minutes with our simple three-step process
          </p>
          <div className="grid md:grid-cols-3 md:grid-rows-1 grid-cols-1 grid-rows-3 text-center gap-4 space-x-4 m-auto w-200 mt-10">
            <div className="outline:none px-4 py-3 rounded-sm w-full">
              <div className="text-5xl flex justify-center">
                <TbCircleNumber1Filled />
              </div>
              <p className="text-md font-bold space-y-1 px-2  ">
                Create Account
              </p>
              <p className="text-sm text-gray-500">
                Sign up with your email and verify your identity in under 2
                minutes.
              </p>
            </div>
            <div className="outline:none px-3 py-2 rounded-sm">
              <div className="text-5xl flex justify-center">
                <TbCircleNumber2Filled />
              </div>
              <p className="text-md font-bold space-y-1 px-2 ">Add Money</p>
              <p className="text-sm text-gray-500">
                Link your bank account card to add oney to your EasyPay wallet.
              </p>
            </div>
            <div className="outline:none px-3 py-2 rounded-sm">
              <div className="text-5xl flex justify-center">
                <TbCircleNumber3Filled />
              </div>
              <p className="text-md font-bold space-y-1 px-2 ">
                Send & Receive
              </p>
              <p className="text-sm text-gray-500">
                Start sending oney to friends, family, or business instantly.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-fit bg-blue-500 w-full">
        <div className="text-white h-50 w-full flex justify-around ">
          <div className="flex items-center">
            <Heading color="text-white" label="10M+" />
          </div>
          <div className="flex items-center">
            <Heading color="text-white" label="500K+" />
          </div>
          <div className="flex items-center">
            <Heading color="text-white" label="99.9%" />
          </div>
          <div className="flex items-center">
            <Heading color="text-white" label="24/7" />
          </div>
        </div>
      </div>
      <div className="h-fit w-full flex justify-center items-center">
        <div className="h-120 flex flex-col justify-center text-center space-y-3">
          <Heading color="text-black" label="Read to get started?" />
          <p className="text-gray-400">
            Join thousand of users how trust EasyPay for their daily
            transactions
          </p>
          <div className="mx-auto">
            <Button text="Get Started" onClick={() => navigate("/dashboard")} />
          </div>
        </div>
      </div>
      <div className="w-full bg-gray-100 border  flex justify-between items-center h-fit border-gray-200">
        <div className="text-2xl w-[40%] mx-4 p-4 font-bold text-blue-500">
          Easy Pay
        </div>
        <div className="w-[60%] flex justify-evenly text-xs">
          <p>2025 EasyPay. All rights reserved.</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Support</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
