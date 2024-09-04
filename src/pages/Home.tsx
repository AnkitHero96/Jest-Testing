
import Navbar from "../components/layout/Navbar";


function Home() {
  return (
    <div className="w-full h-[100vh] bg-[#F2F5F9]">
      <Navbar />
      <div className="w-full h-[100vh] mt-[40px] bg-[#343131f0]">
        {" "}
        <h1 className="text-center text-6xl font-normal text-[#37a0bd]">
          WELCOME
        </h1>
      </div>
    </div>
  );
}

export default Home;
