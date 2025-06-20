import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import { useState } from "react";

const SignUp: React.FC = () => {
  const navigate = useNavigate();

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
  };

  return (
    <div className="bg-slate-300 w-full h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-90 p-2 h-max px-4 pb-10 flex flex-col justify-center items-center">
        <div className="text-center">
          <Heading label={"Sign Up"} />
          <SubHeading />
        </div>
        <form className="items-start" onSubmit={handleSubmit}>
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
