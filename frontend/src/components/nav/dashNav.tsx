import type { NextPage } from "next";
import Link from "next/link";

const DashNav: NextPage = () => {
  return (
    <div className="w-full bg-gray-50 flex row items-center p-4">
      <div className="flex-1 text-left">
        <Link href="/" passHref>
          <h1 className="text-3xl font-bold cursor-pointer">Ip Grabber</h1>
        </Link>
      </div>
      <div className="flex row space-x-4">
        <div className="text-2xl hidden sm:block">
          <Link href="/dash" passHref>
            Dash
          </Link>
        </div>
        <div className="text-2xl hidden sm:block">
          <Link href="/dash" passHref>
            Dash
          </Link>
        </div>
        <Link href="/dash/new-room" passHref>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            New Room
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DashNav;
