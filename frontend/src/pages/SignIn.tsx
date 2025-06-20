import Button from "../components/Button";
import Footer from "../components/Footer";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const SignIn = () => {
  return (
    <div className="bg-slate-300 w-full h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-90 p-2 h-max px-4 pb-10 flex flex-col justify-center items-center">
        <div className="text-center">
          <Heading label={"Sign In"} />
          <SubHeading />
        </div>
        <div className="items-start">
          <InputBox
            label="Email"
            placeholder="John.Doe@gmail.com"
            type="text"
          />
          <InputBox label="Password" placeholder="******" type="password" />
          <Button text="Sign In" />
        </div>
        <Footer msg="Don't have an account? " redirect="SignUp" />
      </div>
    </div>
  );
};

export default SignIn;
