import type { NextPage } from "next";
import Link from "next/link";
import { MouseEventHandler, useContext, useRef, useState } from "react";
import { AuthContext } from "../../modules/authProvider";

const DashNav: NextPage = () => {
  const { username } = useContext(AuthContext);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="w-full bg-gray-50 flex row items-center p-4">
      <div className="flex-1 text-left sm:visible invisible">
        <Link href="/" passHref>
          <h1 className="text-3xl font-bold cursor-pointer">Ip Grabber</h1>
        </Link>
      </div>
      <div className="flex row space-x-4">
        {username && (
          <div>
            <div
              className="flex flex-row gap-2 cursor-pointer"
              onClick={() => {
                setOpenMenu(!openMenu);
              }}
            >
              <img
                src={`https://avatars.dicebear.com/api/bottts/${username}.svg`}
                className="bg-gray-200 p-1 rounded-full h-10"
              />
              <h1 className="text-2xl">{username}</h1>
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="h-10"
                viewBox="0 0 16 16"
              >
                <path
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </div>
            {openMenu && <DropDownMenu />}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashNav;

const DropDownMenu: NextPage = () => {
  return (
    <div className="bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow w-44 fixed right-3 mt-1">
      <ul className="py-1">
        <Link href="/dash" passHref>
          <DropDownItem>Dashboard</DropDownItem>
        </Link>
        <Link href="/user" passHref>
          <DropDownItem>Settings</DropDownItem>
        </Link>
        <DropDownItem>Logout</DropDownItem>
      </ul>
    </div>
  );
};

interface DropDownItemProps {
  onClick?: MouseEventHandler<HTMLLIElement>;
}

const DropDownItem: NextPage<DropDownItemProps> = ({ children, onClick }) => {
  return (
    <li onClick={onClick}>
      <a className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 cursor-pointer">
        {children}
      </a>
    </li>
  );
};
