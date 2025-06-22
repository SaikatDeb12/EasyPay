import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useEffect, useState } from "react";
import axios from "axios";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function redirect() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
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
        console.log(res.data.msg);
        if (res.data.msg == "welcome") {
          navigate("/dashboard");
        }
      } catch (err) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    }
    redirect();
  }, [navigate]);

  type Schema = {
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

  const [value, setValue] = useState<Schema>({
    name: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
    const res = await axios.post(
      (import.meta.env.VITE_BASE_URL as string) + "/api/v1/user/signup",
      value
    );
    console.log(res.data.msg);
    navigate("/signin");
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div className="bg-slate-300 w-full h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-90 p-2 h-max px-4 pb-10 flex flex-col justify-center items-center">
        <div className="text-center">
          <Heading label={"Sign Up"} />
          <SubHeading />
        </div>
        <form className="items-start space-y-6 mt-4" onSubmit={handleSubmit}>
          <InputBox
            name={"firstName"}
            label="First Name"
            placeholder="John"
            type="text"
            onChange={handleChange}
          />
          <InputBox
            name={"lastName"}
            label="Last Name"
            placeholder="Doe"
            type="text"
            onChange={handleChange}
          />
          <InputBox
            name="email"
            label="Email"
            placeholder="John.Doe@gmail.com"
            type="text"
            onChange={handleChange}
          />
          <InputBox
            name="password"
            label="Password"
            placeholder="******"
            type="password"
            onChange={handleChange}
          />
          <Button text="Sign Up" />
        </form>
        <Footer
          msg="Already have an account? "
          redirect="SignIn"
          onClick={() => navigate("/signin")}
        />
      </div>
    </div>
  );
};

export default SignUp;
