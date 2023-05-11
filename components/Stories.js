import Image from "next/image";
import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

const Stories = () => {
  const [fakeUsers, setFakeUsers] = useState([]);

  function createRandomUser() {
    return {
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    };
  }

  useEffect(() => {
    const genUsers = [];
    // ! below code generates an array containing dummy data so as to use it in our website
    // * using an empty but size initialized array to populate users into the fake users array
    Array.from({ length: 10 }).forEach(() => {
      genUsers.push(createRandomUser());
    });
    setFakeUsers(genUsers);
  }, []);

  return (
    <>
      <section className="mx-4 md:mx-0 flex py-2 items-center space-x-2 overflow-x-scroll scrollbar-none">
        {/* below div is to be mapped depending on the number of users */}
        {fakeUsers?.map((user) => {
          return (
            <div
              key={user.userId}
              className="flex flex-col items-center space-y-1"
            >
              <img
                src={user.avatar}
                className="rounded-full hover:scale-110 transition transform duration-200 ease-out object-contain h-16 w-16 p-[2px] border-spacing-2 border-2 border-red-300"
                alt="user profile pic"
              />
              <span className="text-xs w-20 truncate text-center">
                {user.username}
              </span>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Stories;
