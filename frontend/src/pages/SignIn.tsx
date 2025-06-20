import Heading from "../components/Heading";

const SignIn = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
