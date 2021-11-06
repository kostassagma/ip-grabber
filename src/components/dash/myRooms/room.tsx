import type { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";
import { OpenRoomContext } from "..";

interface Props {
  link: string;
  id: string;
}

const Room: NextPage<Props> = ({ link, id }) => {
  const openedRoom = useContext(OpenRoomContext);
  return (
    <Link href={`/dash/${id}`} passHref>
      <div className="border-b border-gray-200 p-2 w-full relative cursor-pointer hover:bg-gray-100">
        {openedRoom.id === id && (
          <div className="absolute left-0 top-2 h-6 w-1 bg-blue-500 rounded-r-md" />
        )}
        {link}
      </div>
    </Link>
  );
};

export default Room;
