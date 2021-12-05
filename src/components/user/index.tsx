import type { NextPage } from "next";
import React, { useContext } from "react";
import AuthOnly from "../../modules/authOnly";
import { AuthContext } from "../../modules/authProvider";
import Footer from "../footer";
import DashNav from "../nav/dashNav";

const UserSettings: NextPage = () => {
  const { username } = useContext(AuthContext);
  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <DashNav />
        <div className="p-5 h-full">
          <div className="p-9 rounded-md shadow-md m-auto max-w-2xl">
            <div>
              <h1 className="text-3xl">
                Hello, <div className="font-bold inline-block">{username}</div>
              </h1>
            </div>
            <form className="rounded space-x-2 flex flex-row mt-4">
              <div className="flex-1">
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                  id="username"
                  type="text"
                  placeholder="Change Username"
                />
              </div>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
            <div className="mt-4 flex flex-col gap-3">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Logout
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserSettings;
