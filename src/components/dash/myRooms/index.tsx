import type { NextPage } from "next";
import Link from "next/link";
import DashNav from "../../nav/dashNav";
import Footer from "../../footer";

const MyRoomsTab: NextPage = () => {
  return (
    <div className="rounded-md shadow-md p-5 w-full min-h-full flex flex-col">
      <h1 className="text-3xl font-bold">My Rooms</h1>
      <form className="rounded space-x-2 flex flex-row mt-auto">
        <div className="flex-1">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="link"
            type="text"
            placeholder="Link"
          />
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            New Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyRoomsTab;
