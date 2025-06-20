import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const SignUp = () => {
  return (
    <div className="bg-slate-300 w-full h-screen flex justify-center items-center">
      <div className="rounded-lg bg-white w-80 p-2 h-max px-4 pb-4 flex flex-col justify-center items-center">
        <div className="text-center">
          <Heading label={"Sign Up"} />
          <SubHeading />
        </div>
        <div className="items-start">
          <InputBox label="First Name" placeholder="John" type="text" />
          <InputBox label="Last Name" placeholder="Doe" type="text" />
          <InputBox
            label="Email"
            placeholder="John.Doe@gmail.com"
            type="text"
          />
          <InputBox label="Password" placeholder="******" type="password" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
