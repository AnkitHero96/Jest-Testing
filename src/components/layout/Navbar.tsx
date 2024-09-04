import { Link } from "react-router-dom";
import { auth } from "../component/utils/firebase";

function Navbar() {
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/Login_Page";
      console.log("User Sign Out");
    } catch (error: any) {
      console.log("Error:", error.message);
    }
  }
  return (
    <div
      role="navigation"
      className="w-full h-[40px] bg-[#435148] flex flex-row justify-between items-center p-[20px] fixed top-0"
    >
      <h1 className="font-medium text-white cursor-pointer italic">Navbar</h1>
      <div className="flex gap-[10px] text-[12px] text-[#87f7f7]">
        <Link to={"/"} className="cursor-pointer hover:underline">
          Home
        </Link>
        <Link to={"/Draggable"} className="cursor-pointer hover:underline">
          Draggable
        </Link>
        <Link to={"/Carousel"} className="cursor-pointer hover:underline">
          Carousel
        </Link>
        <span className="cursor-pointer hover:underline">About</span>
        <Link to={"/Login_Page"} className="cursor-pointer hover:underline">
          Login
        </Link>
        <span className="cursor-pointer hover:underline" onClick={handleLogout}>Logout</span>
      </div>
    </div>
  );
}

export default Navbar;
