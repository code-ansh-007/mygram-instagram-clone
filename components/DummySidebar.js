import Image from "next/image";
import mygram from "../images/Mygram.png";
import {
  AiOutlineHeart,
  AiFillHome,
  AiOutlineCompass,
  AiOutlineMessage,
} from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { CgClapperBoard } from "react-icons/cg";
import { FiPlusSquare } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

const DummySidebar = () => {
  return (
    <>
      <section className="px-3 fixed bg-white top-0 left-0 pr-[50px] border-r-[1px] border-gray-300 flex flex-col h-screen overflow-y-scroll pb-3 scrollbar-none">
        <div className="pl-4 pt-7" onClick={() => router.push("/")}>
          <Image src={mygram} width={100} alt="brand pic" />
        </div>{" "}
        <section className="pl-4 pt-[40px] flex flex-col space-y-6">
          <div className="flex items-center space-x-3">
            <AiFillHome className="text-3xl" />
            <span className="w-[150px] rounded-md h-[20px] bg-blue-300 animate-pulse"></span>
          </div>
          <div className="flex items-center space-x-3">
            <BiSearch className="text-3xl" />
            <span className="w-[150px] rounded-md h-[20px] bg-blue-300 animate-pulse"></span>
          </div>
          <div className="flex items-center space-x-3">
            <AiOutlineCompass className="text-3xl" />
            <span className="w-[150px] rounded-md h-[20px] bg-blue-300 animate-pulse"></span>
          </div>
          <div className="flex items-center space-x-3">
            <CgClapperBoard className="text-3xl" />
            <span className="w-[150px] rounded-md h-[20px] bg-blue-300 animate-pulse"></span>
          </div>
          <div className="flex items-center space-x-3">
            <AiOutlineMessage className="text-3xl" />
            <span className="w-[150px] rounded-md h-[20px] bg-blue-300 animate-pulse"></span>
          </div>
          <div className="flex items-center space-x-3">
            <AiOutlineHeart className="text-3xl" />
            <span className="w-[150px] rounded-md h-[20px] bg-blue-300 animate-pulse"></span>
          </div>
          <div className="flex items-center space-x-3">
            <FiPlusSquare className="text-3xl" />
            <span className="w-[150px] rounded-md h-[20px] bg-blue-300 animate-pulse"></span>
          </div>

          <div>
            <Link href="/auth/signin">
              <button className="border-[1.5px] hover:bg-blue-400 hover:text-white active:scale-105 transition transform duration-150 px-2 py-1 rounded-full text-blue-500 shadow-blue-400 border-blue-400">
                Sign In
              </button>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <GiHamburgerMenu className="text-3xl" />
            <span className="w-[150px] rounded-md h-[20px] bg-blue-300 animate-pulse"></span>
          </div>
        </section>
      </section>
    </>
  );
};

export default DummySidebar;
