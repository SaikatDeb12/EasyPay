import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  // const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function checkAuth() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          // setMessage("Welcome guest");
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
          // setMessage("Welcome Guest");
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
        <div className="flex items-center m-2 ">
          <div
            className="text-sm mx-4 text-blue-500 w-20 cursor-pointer"
            onClick={() => navigate("/signin")}
          >
            Sign In
          </div>
          <Button text="Get Started" onClick={() => navigate("/signup")} />
        </div>
      </div>
      <div className="bg-blue-100 z-0 h-150 flex flex-col justify-center">
        <div className="mx-10 space-y-3">
          <div className="flex space-x-2 leading-none">
            <Heading label="Send & Receive Money" color="black" />
            <Heading label="Instantly" color="text-blue-500" />
          </div>
          <div className="w-110 text-gray-600 space-y-3">
            <p>
              The fastest and most secure way to transfer money. Join to explore
              the true potential
            </p>
            <Button
              text="Start Sending Money ->"
              onClick={() => navigate("/signup")}
            />
            <div className="flex text-sm space-x-5">
              <p>No setup fees</p>
              <p>Instant transfer</p>
            </div>
          </div>
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
            <div className="outline:none px-4 py-3 rounded-sm">
              <p className="text-md font-bold space-y-1 px-2  ">
                Create Account
              </p>
              <p className="text-sm text-gray-500">
                Sign up with your email and verify your identity in under 2
                minutes.
              </p>
            </div>
            <div className="outline:none px-3 py-2 rounded-sm">
              <p className="text-md font-bold space-y-1 px-2 ">Add Money</p>
              <p className="text-sm text-gray-500">
                Link your bank account card to add oney to your EasyPay wallet.
              </p>
            </div>
            <div className="outline:none px-3 py-2 rounded-sm">
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
      <div className="h-50 bg-blue-500 w-full flex items-center">
        <div className="text-white">
          <p>here is the footer</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
