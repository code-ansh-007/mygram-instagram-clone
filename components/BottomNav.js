import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
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
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

const BottomNav = () => {
  const { data: session } = useSession();
  const [showLogOut, setShowLogOut] = useState(false);
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const router = useRouter();
  return (
    <>
      <main className="fixed bottom-0 bg-white z-50 w-full flex md:hidden justify-around py-3 items-center border-t-[1px] border-gray-300">
        <AiFillHome className="text-2xl" />
        <AiOutlineCompass className="text-2xl" />
        <CgClapperBoard className="text-2xl" />
        <FiPlusSquare
          className="text-2xl"
          onClick={() => {
            if (session) {
              setOpenModal(true);
            } else {
              router.push("/auth/signin");
            }
          }}
        />
        <AiOutlineMessage className="text-2xl" />
        {session ? (
          <div>
            <Image
              src={session?.user?.image}
              width={26}
              height={26}
              alt="user profile pic"
              className="rounded-full"
              onClick={() => setShowLogOut(!showLogOut)}
            />
          </div>
        ) : (
          <Link href="/auth/signin">
            <button className="border-[1.5px] hover:bg-blue-400 hover:text-white active:scale-105 transition transform duration-150 px-2 py-1 rounded-full text-blue-500 shadow-blue-400 border-blue-400">
              Sign In
            </button>
          </Link>
        )}
        {showLogOut && (
          <button
            onClick={() => signOut()}
            className="absolute bottom-16 right-4 p-1 bg-red-500 text-white font-semibold rounded-lg px-2"
          >
            Log Out
          </button>
        )}
      </main>
    </>
  );
};

export default BottomNav;
