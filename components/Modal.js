import React, { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { VscSmiley } from "react-icons/vsc";
import { AiOutlineCamera } from "react-icons/ai";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

const Modal = () => {
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const { data: session } = useSession();
  //   const modalOpen = useRecoilValue(modalState);
  const filePickerRef = useRef(null);
  const captionRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadPost = async () => {
    if (loading) return;
    setLoading(true);

    // * 1) Create a post and add to firestore "posts" collection
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.username,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    // * 2) get the post id for the newly created post
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    // * 3) upload the image to the firebase storage with the post id
    // * 4) get a download URL from the fb storage and update original post with the image
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadUrl = await getDownloadURL(imageRef); // ! downloads the url of the image which was uploaded in the storage of firebase so that we can update the recently created object to contain the image url of the selected file
        await updateDoc(doc(db, "posts", docRef.id), {
          // ! updates the recently created user object which was stored in the firestore database to add the image url to the object which we can use later on to show in the ui of out instagram clone
          image: downloadUrl,
        });
      }
    );
    setOpenModal(false);
    setLoading(false);
    setSelectedFile(null);
  };

  //  ! below is a very powerful function which helps us to asssign the file selected by the user to the state in react
  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const handleClose = (e) => {
    if (
      e.target.className ===
      "flex items-center justify-center w-full h-full fixed top-0 left-0 bg-black bg-opacity-30"
    ) {
      setOpenModal(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault;
  };
  return (
    <>
      {openModal && (
        <div
          onClick={handleClose}
          className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-black bg-opacity-30"
        >
          <div
            onSubmit={handleSubmit}
            className="bg-white p-3 rounded-md py-10 text-black w-[450px] mx-4 flex flex-col items-center space-y-7 justify-center"
          >
            <div className="flex flex-col items-center justify-center space-y-3">
              {selectedFile ? (
                <div className="relative">
                  {" "}
                  <img
                    src={selectedFile}
                    className="w-[300px] object-contain cursor-pointer"
                    alt="post image"
                  />
                  <span
                    onClick={() => setSelectedFile(null)}
                    className="bg-black bg-opacity-30 text-white text-center py-4 font-semibold absolute bottom-0 w-full"
                  >
                    Select another one
                  </span>
                </div>
              ) : (
                <AiOutlineCamera
                  onClick={() => filePickerRef.current.click()}
                  className="text-6xl bg-red-200 text-red-500 p-2 rounded-full"
                />
              )}
              <span className="text-xl font-semibold">Upload Photo</span>
            </div>{" "}
            <input
              ref={filePickerRef}
              type="file"
              name="imageUpload"
              id="imageUpload"
              hidden
              className="w-fit"
              onChange={addImageToPost}
            />
            <div className="flex space-x-2 items-center">
              <VscSmiley className="text-2xl text-red-400" />
              <input
                ref={captionRef}
                type="text"
                placeholder="Add a caption..."
                className="p-1 outline-none"
              />
            </div>
            <button
              disabled={loading || !selectedFile}
              className={
                loading || !selectedFile
                  ? "bg-opacity-50 p-2 font-bold text-white bg-red-400 rounded-lg active:scale-105 transition transform duration-150 ease-in-out"
                  : "p-2 font-bold text-white bg-red-400 rounded-lg active:scale-105 transition transform duration-150 ease-in-out"
              }
              onClick={uploadPost}
            >
              {loading ? "Uploading..." : "Upload Post"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
