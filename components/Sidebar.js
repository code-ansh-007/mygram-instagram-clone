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
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
// ? RECOIL LOGIC IS BELOW IN WHICH WE JUST HAVE TO USE THE HOOK PROVIDED BY RECOIL AND THE ATOM FILE CREATED IN THE ATOMS DIRECTORY
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

const Sidebar = () => {
  const router = useRouter();
  const { data: session } = useSession(); // ! making use of the session object so as to retrieve some user information
  // console.log(session);
  const [openModal, setOpenModal] = useRecoilState(modalState);
  // const openModal = useRecoilValue(); // ! this gives you the read only value or something similar to useselector hoook in redux
  return (
    <>
      <section className="px-3 fixed bg-white top-0 left-0 pr-[55px] border-r-[1px] border-gray-300 flex flex-col h-screen overflow-y-scroll pb-3 scrollbar-none">
        <div className="pl-4 pt-7" onClick={() => router.push("/")}>
          <Image src={mygram} width={100} alt="brand pic" />
        </div>{" "}
        <section className="pl-4 pt-[40px] flex flex-col space-y-6">
          <div className="flex items-center space-x-3">
            <AiFillHome className="text-3xl" />
            <span>Home</span>
          </div>
          <div className="flex items-center space-x-3">
            <BiSearch className="text-3xl" />
            <span>Search</span>
          </div>
          <div className="flex items-center space-x-3">
            <AiOutlineCompass className="text-3xl" />
            <span>Explore</span>
          </div>
          <div className="flex items-center space-x-3">
            <CgClapperBoard className="text-3xl" />
            <span>Reels</span>
          </div>
          <div className="flex items-center space-x-3">
            <AiOutlineMessage className="text-3xl" />
            <span>Messages</span>
          </div>
          <div className="flex items-center space-x-3">
            <AiOutlineHeart className="text-3xl" />
            <span>Notifications</span>
          </div>
          <div
            onClick={() => setOpenModal(true)}
            className="flex items-center space-x-3"
          >
            <FiPlusSquare className="text-3xl" />
            <span>Create</span>
          </div>
          {session ? (
            <>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-3">
                  <div>
                    <Image
                      src={session.user.image}
                      width={30}
                      height={30}
                      alt="user profile pic"
                      className="rounded-full"
                    />
                  </div>{" "}
                  <span>Profile</span>
                </div>
                <div>
                  {" "}
                  <button
                    onClick={() => signOut()}
                    className="border-[1.5px] hover:bg-red-400 hover:text-white active:scale-105 transition transform duration-150 px-2 py-1 text-sm rounded-full text-red-500 border-red-400"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <Link href="/auth/signin">
                <button className="border-[1.5px] hover:bg-blue-400 hover:text-white active:scale-105 transition transform duration-150 px-2 py-1 rounded-full text-blue-500 shadow-blue-400 border-blue-400">
                  Sign In
                </button>
              </Link>
            </div>
          )}
          <div className="flex items-center space-x-3">
            <GiHamburgerMenu className="text-3xl" />
            <span>More</span>
          </div>
        </section>
      </section>
    </>
  );
};

export default Sidebar;
