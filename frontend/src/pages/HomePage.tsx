import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Heading from "../components/Heading";
import { MdOutlineDoneOutline, MdOutlineSecurity } from "react-icons/md";
import { AiOutlineMobile, AiOutlineThunderbolt } from "react-icons/ai";
import {
    TbCircleNumber1Filled,
    TbCircleNumber2Filled,
    TbCircleNumber3Filled,
} from "react-icons/tb";
import { FaRegCopyright } from "react-icons/fa";
import Loading from "../components/Loading";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState<boolean>(false);
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
                    },
                );
                if (res.data.msg == "welcome") {
                    setIsValid(true);
                    setIsLoading(false);
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                const err = error as AxiosError;
                const data = err.response?.data as { msg: string };
                toast.error(data.msg);
            } finally {
                setIsLoading(false);
            }
        }
        checkAuth();
    }, [navigate]);
    return isLoading ? (
        <Loading />
    ) : (
        <div className="w-full min-h-screen">
            <div className="w-full z-10 sticky bg-white flex justify-between items-center h-20 sm:h-fit border-gray-400 shadow-lg px-2 sm:px-4">
                <div className="text-xl sm:text-2xl p-2 sm:p-4 font-bold text-blue-500">
                    Easy Pay
                </div>
                {isValid ? (
                    <div className="flex items-center mr-2 sm:mr-10">
                        <div
                            className="text-xs sm:text-sm mx-2 sm:mx-4 text-blue-500 w-16 sm:w-20 cursor-pointer hover:underline"
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.reload();
                            }}
                        >
                            Logout
                        </div>
                        <Button
                            bgColor="bg-blue-500"
                            textColor="text-white"
                            text="Dashboard"
                            onClick={() => navigate("/dashboard")}
                        />
                    </div>
                ) : (
                    <div className="flex items-center mr-2 sm:mr-10">
                        <div
                            className="text-xs sm:text-sm mx-2 sm:mx-4 text-blue-500 w-16 sm:w-20 cursor-pointer hover:underline"
                            onClick={() => navigate("/signin")}
                        >
                            Sign In
                        </div>
                        <Button
                            bgColor="bg-blue-500"
                            textColor="text-white"
                            text="Get Started"
                            onClick={() => {
                                if (!isValid) navigate("/signup");
                            }}
                        />
                    </div>
                )}
            </div>

            <div className="bg-blue-100 w-full min-h-[80vh] flex flex-col-reverse md:flex-row justify-between items-center px-4 sm:px-6 py-8 sm:py-12 gap-6">
                <div
                    className="mx-4 sm:mx-10 space-y-3 w-full md:w-1/2"
                    data-aos="fade-right"
                    data-aos-duration="1000"
                >
                    <div className="space-y-2 sm:space-y-0 sm:space-x-3 text-black text-3xl sm:text-4xl md:text-5xl font-bold">
                        <span>Send & Receive Money</span>
                        <span className="text-blue-500 block sm:inline">
                            Instantly
                        </span>
                    </div>
                    <div className="max-w-md text-gray-700 space-y-3">
                        <p className="text-sm sm:text-base">
                            The fastest and most secure way to transfer money.
                            Join to explore the true potential
                        </p>
                        <Button
                            bgColor="bg-blue-500"
                            textColor="text-white"
                            text="Start Sending Money"
                            onClick={() => {
                                if (!isValid) navigate("/signin");
                                else navigate("/dashboard");
                            }}
                        />
                        <div className="flex flex-wrap text-xs sm:text-sm gap-2 sm:gap-5">
                            <div className="flex items-center space-x-1">
                                <div className="text-green-600">
                                    <MdOutlineDoneOutline />
                                </div>
                                <p>No setup fees</p>
                            </div>
                            <div className="flex items-center justify-center space-x-1">
                                <div className="text-green-600">
                                    <MdOutlineDoneOutline />
                                </div>
                                <p>Instant transfer</p>
                            </div>
                            <div className="flex items-center space-x-1">
                                <div className="text-green-600">
                                    <MdOutlineDoneOutline />
                                </div>
                                <p>24/7 support</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="w-full md:w-1/2 flex justify-center relative"
                    data-aos="fade-left"
                    data-aos-duration="1000"
                >
                    <img
                        className="object-cover h-auto max-h-60 sm:max-h-80 md:max-h-96 w-auto max-w-full rounded-lg "
                        src="/transfer2.jpg"
                        alt="cards"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-transparent to-blue-100/100 pointer-events-none"></div>
                </div>
            </div>

            <div className="py-10 sm:py-20 w-full flex justify-center">
                <div
                    className="flex flex-col items-center text-center space-y-4 px-4 sm:px-6"
                    data-aos="fade-up"
                >
                    <Heading
                        label="Everything you need for digital payments"
                        color="text-black"
                    />
                    <p className="text-gray-600 text-center max-w-lg text-sm sm:text-base">
                        From instant transfers to secure transactions, EasyPay
                        provides most of the tool you need for seamless money
                        management
                    </p>
                    <div className="grid md:grid-cols-3 grid-cols-1 text-center gap-4 sm:gap-6 max-w-5xl mt-6 sm:mt-10">
                        <div
                            className="border-2 text-center border-blue-50 px-4 py-3 rounded-sm"
                            data-aos="fade-down"
                            data-aos-duration="500"
                        >
                            <div className="text-4xl sm:text-5xl flex justify-center text-blue-500">
                                <AiOutlineThunderbolt />
                            </div>
                            <p className="text-sm sm:text-base font-bold px-2">
                                Instant Transfer
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                                Send money to anyone in seconds. No waiting, no
                                delays
                            </p>
                        </div>
                        <div
                            className="border-2 border-blue-50 px-3 py-2 rounded-sm"
                            data-aos="fade-down"
                            data-aos-duration="500"
                        >
                            <div className="text-4xl sm:text-5xl flex justify-center text-blue-500">
                                <MdOutlineSecurity />
                            </div>
                            <p className="text-sm sm:text-base font-bold px-2">
                                Bank-Level Security
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                                Your money is protected with proper encryption
                            </p>
                        </div>
                        <div
                            className="border-2 border-blue-50 px-3 py-2 rounded-sm"
                            data-aos="fade-down"
                            data-aos-duration="500"
                        >
                            <div className="text-4xl sm:text-5xl flex justify-center text-blue-500">
                                <AiOutlineMobile />
                            </div>
                            <p className="text-sm sm:text-base font-bold px-2">
                                Interactive UI
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                                Enjoy the smooth money transfer, just like our
                                UI
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-10 sm:py-20 bg-gray-200 w-full flex justify-center items-center">
                <div
                    className="flex flex-col items-center text-center space-y-4 px-4 sm:px-6"
                    data-aos="fade-up"
                >
                    <Heading label="How EasyPay Works" color="text-black" />
                    <p className="text-gray-600 text-center max-w-lg text-sm sm:text-base">
                        Get started in minutes with our simple three-step
                        process
                    </p>
                    <div className="text-center grid md:grid-cols-3 grid-cols-1 gap-4 sm:gap-6 max-w-5xl mt-6 sm:mt-10">
                        <div
                            className="outline:none px-4 py-3 rounded-sm w-full"
                            data-aos="fade-down"
                            data-aos-duration="500"
                        >
                            <div className="text-4xl sm:text-5xl flex justify-center text-blue-600">
                                <TbCircleNumber1Filled />
                            </div>
                            <p className="text-sm sm:text-base font-bold px-2">
                                Create Account
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                                Sign up with your email and verify your identity
                                in under 2 minutes.
                            </p>
                        </div>
                        <div
                            className="outline:none px-3 py-2 rounded-sm"
                            data-aos="fade-down"
                            data-aos-duration="500"
                        >
                            <div className="text-4xl sm:text-5xl flex justify-center text-blue-600">
                                <TbCircleNumber2Filled />
                            </div>
                            <p className="text-sm sm:text-base font-bold px-2">
                                Add Money
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                                Link your bank account card to add money to your
                                EasyPay wallet.
                            </p>
                        </div>
                        <div
                            className="outline:none px-3 py-2 rounded-sm"
                            data-aos="fade-down"
                            data-aos-duration="1000"
                        >
                            <div className="text-4xl sm:text-5xl flex justify-center text-blue-600">
                                <TbCircleNumber3Filled />
                            </div>
                            <p className="text-sm sm:text-base font-bold px-2">
                                Send & Receive
                            </p>
                            <p className="text-xs sm:text-sm text-gray-500">
                                Start sending money to friends, family, or
                                business instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-fit py-10 sm:py-16 bg-blue-600 w-full">
                <div className="text-white w-full flex flex-col sm:flex-row justify-around items-center gap-6 sm:gap-0 px-4">
                    <div
                        className="flex flex-col justify-center text-center"
                        data-aos="flip-up"
                        data-aos-duration="500"
                    >
                        <Heading color="text-white" label="10M+" />
                        <p className="text-xs sm:text-sm">Transactions</p>
                    </div>
                    <div
                        className="flex flex-col justify-center text-center"
                        data-aos="flip-up"
                        data-aos-duration="500"
                    >
                        <Heading color="text-white" label="500K+" />
                        <p className="text-xs sm:text-sm">Active Users</p>
                    </div>
                    <div
                        className="flex flex-col justify-center text-center"
                        data-aos="flip-up"
                        data-aos-duration="500"
                    >
                        <Heading color="text-white" label="99.9%" />
                        <p className="text-xs sm:text-sm">Uptime</p>
                    </div>
                    <div
                        className="flex flex-col justify-center text-center"
                        data-aos="flip-up"
                        data-aos-duration="500"
                    >
                        <Heading color="text-white" label="24/7" />
                        <p className="text-xs sm:text-sm">Support</p>
                    </div>
                </div>
            </div>

            <div className="py-10 sm:py-20 w-full flex justify-center items-center px-4">
                <div
                    className="flex flex-col justify-center text-center space-y-3 max-w-md"
                    data-aos="zoom-in"
                    data-aos-duration="1000"
                >
                    <Heading color="text-black" label="Ready to get started?" />
                    <p className="text-gray-400 text-sm sm:text-base">
                        Join thousands of users who trust EasyPay for their
                        daily transactions
                    </p>
                    <div className="mx-auto">
                        <Button
                            bgColor="bg-blue-500"
                            textColor="text-white"
                            text="Get Started"
                            onClick={() => {
                                if (!isValid) navigate("/signin");
                                else navigate("/dashboard");
                            }}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full bg-gray-100 border flex flex-col sm:flex-row justify-between items-center h-fit border-gray-200 px-4 py-4">
                <div className="text-xl sm:text-2xl font-bold text-blue-500 mb-2 sm:mb-0">
                    Easy Pay
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs">
                    <div className="flex items-center space-x-1 font-normal">
                        <FaRegCopyright />
                        <p>
                            {new Date().getFullYear()} EasyPay. All rights
                            reserved.
                        </p>
                    </div>
                    <p>Privacy Policy</p>
                    <p>Terms of Service</p>
                    <p>Support</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
