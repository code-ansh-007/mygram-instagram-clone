import React, { useEffect } from "react";
import ansh from "../../images/Me_pic.jpg";
import demo from "../../images/demo.jpg";
import { BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { AiOutlineMessage } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { BsBookmark } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import { useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useSession } from "next-auth/react";

const PostCard = ({ id, username, caption, image, profileImage }) => {
  const [commentWritten, setCommentWritten] = useState("");
  // * comments coming from the firestore database
  const [comments, setComments] = useState();
  const [likes, setLikes] = useState([]);
  const { data: session } = useSession(); // ! session object
  const [hasLiked, setHasLiked] = useState(false);

  const sendComment = async () => {
    const commetToSend = commentWritten;
    await addDoc(collection(db, "posts", id, "comments"), {
      // * adds this new collection to the particular post to which the comment was intended
      comment: commetToSend,
      username: session.user.username,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  useEffect(
    // ? this useeffect is for the comments that has to be updated real time whenever the user posts a comment
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          setComments(snapshot.docs);
        }
      ),
    [db, id]
  );

  useEffect(
    // ? this useeffect is for the likes on the post
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ), // ? this bit of logic basically goes through each and every item in the likes array and checks if there exists a like whose document id in the cloud firestore mathces the sesson.user.id, as we had set the document id of the like field to be the id of the user when setting in the like field
    [likes]
  ); // * only dependent on the likes array so as to keep the like count updated

  const likePost = async () => {
    // ? if you have liked the post you unlike it and if you havent liked the post you like it, this logic is implemented in the code below
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  return (
    <>
      <section className="bg-white flex flex-col my-5 rounded-md border-b-[1px] border-gray-300 mx-1 md:mx-0">
        {/* TOP SECTION */}
        <div className="flex items-center justify-between px-3 pl-0 py-2 ">
          <span className="flex space-x-3 items-center">
            <Image
              src={profileImage}
              width={30}
              height={30}
              alt="User Profile pic"
              className="rounded-full"
            />
            <span className="">{username}</span>
          </span>
          <BsThreeDots />
        </div>
        {/* IMAGES SECTION */}
        <div>
          <img
            src={image}
            className="object-cover w-full rounded-[4px]"
            alt="pic"
          />
        </div>
        <div className="px-3 py-2">
          {/* ACTIONS SECTION */}
          {session && (
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                {hasLiked ? (
                  <AiFillHeart
                    onClick={likePost}
                    className="text-3xl text-red-500 active:scale-105 transition transform duration-150 ease-in-out"
                  />
                ) : (
                  <AiOutlineHeart
                    onClick={likePost}
                    className="text-3xl active:scale-105 transition transform duration-150 ease-in-out"
                  />
                )}

                <AiOutlineMessage className="text-3xl active:scale-105 transition transform duration-150 ease-in-out" />
                <FiSend className="text-2xl active:scale-105 transition transform duration-150 ease-in-out" />
              </div>
              <BsBookmark className="text-2xl active:scale-105 transition transform duration-150 ease-in-out" />
            </div>
          )}
          {/* BOTTOM SECTION */}
          <span className="font-bold text-sm sm:text-md">
            {likes.length > 0
              ? `${likes.length} ${likes.length === 1 ? "like" : "likes"}`
              : null}
          </span>
          <div className=" flex space-x-2 my-2">
            <span className="font-bold h-fit text-sm sm:text-md">
              {username}
            </span>
            <span className="text-sm sm:text-md">{caption}</span>
          </div>
          {/* COMMENTS SECTION */}
          <span className="text-gray-500">Comments</span>
          <section className="my-2 max-h-[80px] scrollbar-rounded-md scrollbar-thumb-gray-300 scrollbar-thin overflow-y-scroll">
            {comments?.map((comment) => {
              return (
                <div key={comment.id} className="flex space-x-2 my-1">
                  <Image
                    src={comment.data().userImage}
                    width={20}
                    height={20}
                    alt="User Profile pic"
                    className="rounded-full h-fit mt-1"
                  />
                  <span className="font-semibold">
                    {comment.data().username}
                  </span>
                  <span>{comment.data().comment}</span>
                </div>
              );
            })}
          </section>
          {/* ADD COMMENT SECTION */}
          {session && (
            <div className="mt-5 flex items-start">
              <span className="flex space-x-2  flex-grow">
                <BsEmojiSmile className="text-xl" />
                <textarea
                  type="text"
                  placeholder="Add a comment..."
                  className="outline-none w-full resize-none text-sm"
                  onChange={(e) => {
                    setCommentWritten(e.target.value);
                  }}
                  value={commentWritten}
                ></textarea>
              </span>
              {commentWritten && (
                <span
                  className="text-blue-400 font-bold ml-2"
                  onClick={() => {
                    sendComment();
                    setCommentWritten("");
                  }}
                >
                  Post
                </span>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PostCard;
