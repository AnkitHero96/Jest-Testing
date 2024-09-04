import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/component/utils/firebase";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href='/';
      console.log("Log in Sucessfull");
    } catch (error: any) {
      console.log(error.message);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="w-full h-[100vh] bg-[#151414f2] flex flex-col justify-center items-center">
        <form
          className="w-[30rem] h-auto border-[2px] rounded-[8px] border-[#afaeae] bg-[#53535329] flex justify-center items-start p-4 gap-7"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="w-full flex flex-col justify-center items-start">
            {" "}
            <span className="text-white font-medium mb-2">User name</span>
            <input
              className="bg-[#0c2626]/60 w-full p-1 rounded-[6px] border border-[#87f7f7] text-[#c3efef] mb-3 "
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              aria-label="User name" // Add aria-label for accessibility
            />
            <span className="text-white font-medium mb-2">Password</span>
            <input
              className="bg-[#0c2626]/60 w-full p-1 rounded-[6px] border border-[#87f7f7] text-[#c3efef]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              aria-label="Password" // Add aria-label for accessibility
            />
            <br />
            <button
              className="bg-[#0c2626]/60 w-[30%] p-1 rounded-[6px] border border-[#87f7f7] text-[#87f7f7] font-normal text-xs"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </button>
            <Link
              to={"/Register_page"}
              className="text-[11px] mt-2 font-light text-blue-100 cursor-pointer"
            >
              Register Here
            </Link>
          </div>
          <img src={"../public/firebase2.png"} width={140} height={20} className="m-auto"/>
        </form>
      </div>
    </div>
  );
};

export default Login;
