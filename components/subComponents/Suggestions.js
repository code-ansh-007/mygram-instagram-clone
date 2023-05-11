import React from "react";
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";

const Suggestions = () => {
  const [fakeUsers, setFakeUsers] = useState([]);
  const [seeAll, setSeeAll] = useState(false);

  function createRandomUser() {
    return {
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      email: faker.internet.email(),
    };
  }
  useEffect(() => {
    const genUsers = [];
    // * using an empty but size initialized array to populate users into the fake users array
    Array.from({ length: 10 }).forEach(() => {
      genUsers.push(createRandomUser());
    });
    setFakeUsers(genUsers);
  }, []);

  const numOfSuggestions = seeAll ? fakeUsers : fakeUsers.slice(0, 4);
  return (
    <>
      <main className="px-5 py-3 flex flex-col items-start pl-12 w-[400px]">
        <div className="flex items-center space-x-[110px] justify-between w-full pb-3">
          <span className="font-medium text-sm text-gray-400">
            Suggestions for you
          </span>
          <span
            onClick={() => setSeeAll(!seeAll)}
            className="font-medium text-sm hover:text-gray-400"
          >
            {seeAll ? "See Less" : "See All"}
          </span>
        </div>
        {/* POPULATED USERS */}
        {numOfSuggestions?.map((user) => {
          return (
            <div
              key={user.userId}
              className="flex justify-between items-center my-2 w-full"
            >
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    className="rounded-full hover:scale-110 transition transform duration-200 ease-out object-contain h-10 w-10"
                    alt="user profile pic"
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">
                      {user.username}
                    </span>
                    <span className="text-gray-500 text-sm w-20 truncate">
                      {user.email}
                    </span>
                  </div>
                </div>
              </div>
              <span className="text-blue-400 text-sm font-semibold mb-2">
                Follow
              </span>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default Suggestions;
