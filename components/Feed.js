import React, { useEffect, useState } from "react";
import PostCard from "./subComponents/PostCard";
import ansh from "../images/Me_pic.jpg";
import Image from "next/image";
import Suggestions from "./subComponents/Suggestions";
import Stories from "./Stories";
import { signOut, useSession } from "next-auth/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Link from "next/link";

const Feed = () => {
  const userName = "Ansh Pradhan";
  const userDesc = "Under construction 🚧";
  const { data: session } = useSession();
  // ! retreiving the posts from the firestore database
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );
    return unsubscribe; // * implementing cleanup function for useeffect
  }, [db]);

  const currentYear = new Date().getFullYear();
  const [showLink, setShowLink] = useState(false);

  return (
    <>
      <main
        className={
          "grid grid-cols-1 md:ml-[300px] md:px-4 xl:grid-cols-2 md:max-w-3xl mt-5 xl:max-w-6xl mx-auto"
        }
      >
        <div className="flex flex-col">
          {/* STORIES SECTION */}
          {session && (
            <div className="">
              <Stories />
            </div>
          )}
          {/* MAIN FEED SECTION */}
          <section className="">
            {posts.map((post) => {
              return (
                <PostCard
                  key={post.id}
                  id={post.id}
                  username={post.data().username}
                  caption={post.data().caption}
                  image={post.data().image}
                  profileImage={post.data().profileImg}
                />
              );
            })}
          </section>
        </div>
        {/* USER DETAILS SECTION */}
        {session ? (
          <section className="flex-col hidden xl:flex w-[400px]">
            <section className="mx-5">
              <div className="flex  items-center justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center space-x-2 ml-7">
                    <Image
                      src={session.user.image}
                      width={60}
                      height={60}
                      className="rounded-full"
                      alt="user profile pic"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">
                        {session.user.username}
                      </span>
                      <span className="text-gray-500 text-sm w-20 truncate">
                        {session.user.email}
                      </span>
                    </div>
                  </div>
                </div>
                <span
                  className="text-blue-400 text-sm font-semibold mb-2"
                  onClick={signOut}
                >
                  Log Out
                </span>
              </div>
            </section>
            {/* SUGGESSTIONS SECTION */}
            <Suggestions />
            {/* FOOTER DIV FOR MYGRAM */}
            <section className="flex flex-col space-y-7">
              <div className="pl-[50px] flex items-center space-x-[2px] flex-wrap">
                <span className="text-gray-400 text-xs hover:underline">
                  About
                </span>
                <span className="text-lg pb-[2px] text-gray-400">·</span>
                <span className="text-gray-400 text-xs hover:underline">
                  Help
                </span>
                <span className="text-lg pb-[2px] text-gray-400">·</span>
                <span className="text-gray-400 text-xs hover:underline">
                  Press
                </span>
                <span className="text-lg pb-[2px] text-gray-400">·</span>
                <span className="text-gray-400 text-xs hover:underline">
                  API
                </span>
                <span className="text-lg pb-[2px] text-gray-400">·</span>
                <span className="text-gray-400 text-xs hover:underline">
                  Jobs
                </span>
                <span className="text-lg pb-[2px] text-gray-400">·</span>
                <span className="text-gray-400 text-xs hover:underline">
                  Privacy
                </span>
                <span className="text-lg pb-[2px] text-gray-400">·</span>
                <span className="text-gray-400 text-xs hover:underline">
                  Terms
                </span>
                <span className="text-lg pb-[2px] text-gray-400">·</span>
                <span className="text-gray-400 text-xs hover:underline">
                  Locations
                </span>
                <span className="text-lg pb-[2px] text-gray-400">·</span>
                <span className="text-gray-400 text-xs hover:underline">
                  Language
                </span>
              </div>
              <div className="relative pl-[50px] text-xs text-gray-400 flex space-x-1">
                <span>© {currentYear} Mygram from</span>
                <Link
                  href={"https://www.linkedin.com/in/ansh-pradhan-2a963818a/"}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span
                    className="hover:text-red-400 hover:underline"
                    onMouseOver={() => setShowLink(true)}
                    onMouseLeave={() => setShowLink(false)}
                  >
                    Ansh Pradhan
                  </span>
                </Link>
                {showLink && (
                  <span className="absolute bottom-5 right-5 bg-gray-200 px-1 rounded-md text-gray-500">
                    Visit Ansh Pradhan's Linked In
                  </span>
                )}
              </div>
            </section>
          </section>
        ) : (
          // * dummy suggestions box to guide the user to signin
          <section className="h-screen flex sticky top-0 justify-center">
            <div className="flex flex-col items-center space-y-4 mt-4">
              <span className="text-xl font-bold text-blue-400">
                Sign In to View Content
              </span>
              {/* <Link href="/about"> */}
              <Link href="/auth/signin">
                <button className="border-[1.5px] hover:bg-blue-400 hover:text-white active:scale-105 transition transform duration-150 px-2 py-1 rounded-full text-blue-500 shadow-blue-400 border-blue-400">
                  Sign In
                </button>
              </Link>
              <div className="flex flex-col items-start space-y-2">
                <div className="w-[250px] rounded-md animate-pulse h-[50px] bg-red-300"></div>
                <span className="w-[238px] rounded-md h-[10px] bg-blue-300 animate-pulse"></span>
                <div className="flex items-center space-x-2">
                  <span className="w-[30px] h-[30px] rounded-full animate-pulse bg-red-300"></span>
                  <span className="w-[200px] rounded-md h-[20px] bg-blue-300 animate-pulse"></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-[30px] h-[30px] rounded-full animate-pulse bg-red-300"></span>
                  <span className="w-[200px] rounded-md h-[20px] bg-blue-300 animate-pulse"></span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-[30px] h-[30px] rounded-full animate-pulse bg-red-300"></span>
                  <span className="w-[200px] rounded-md h-[20px] bg-blue-300 animate-pulse"></span>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Feed;
