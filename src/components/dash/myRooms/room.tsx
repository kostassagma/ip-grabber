import type { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";
import { OpenRoomContext } from "..";

interface Props {
  link: string;
  id: string;
  origin: string;
}

const Room: NextPage<Props> = ({ link, id, origin }) => {
  const openedRoom = useContext(OpenRoomContext);
  return (
    <Link href={`/dash/${id}`} passHref>
      <div className="border-b border-gray-200 p-2 w-full relative cursor-pointer hover:bg-gray-100">
        {openedRoom.id === id && (
          <div className="absolute left-0 top-1.5 h-12 w-1 bg-blue-500 rounded-r-md" />
        )}
        <h1 className="text-lg">
        {origin}
        </h1>
        <p className="text-xs text-gray-500">{link}</p>
      </div>
    </Link>
  );
};

export default Room;
