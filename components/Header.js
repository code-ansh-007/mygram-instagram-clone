import Image from "next/image";
import React from "react";
import mygram from "../images/Mygram.png";
import { BiSearch, BiSend } from "react-icons/bi";
import { FiSend } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import {
  AiOutlineHeart,
  AiOutlinePlusCircle,
  AiFillHome,
} from "react-icons/ai";
// * profile pic for demo purpose only
import ansh from "../images/Me_pic.jpg";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  const [menu, setMenu] = useState(false);
  const [notifications, setNotifications] = useState(4); // TODO dummy initial value
  return (
    <>
      <section className="flex sticky top-0 z-50 bg-white items-center justify-evenly space-x-6 py-2 shadow-md px-2">
        {/* BRAND SECTION OF THE HEADER */}
        <div>
          <Image src={mygram} width={100} alt="brand pic" />
        </div>
        {/* SEARCH SECTION OF THE HEADER */}
        <div className="relative">
          <BiSearch className="absolute top-[10px] left-2 text-gray-500" />
          <input
            type="search"
            name="search"
            id="search"
            className="bg-gray-100 border-[2px] w-[60vw] md:w-auto rounded-md border-gray-200 pl-7 pr-1 py-1 outline-none"
            placeholder="Search"
            style={{ caretColor: "red" }}
          />
        </div>
        <AiOutlineHeart className="text-5xl pr-3" />
      </section>
    </>
  );
};

export default Header;
