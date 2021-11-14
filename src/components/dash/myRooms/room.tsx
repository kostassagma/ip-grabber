import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { OpenRoomContext } from "..";
import { API } from "../../../lib/constants";

interface Props {
  link: string;
  id: string;
  origin: string;
  removeRoom: Function;
}

const Room: NextPage<Props> = ({ link, id, origin, removeRoom }) => {
  const openedRoom = useContext(OpenRoomContext);
  const router = useRouter();

  const deleteRoom = async () => {
    const res = await fetch(`${API}/rooms/delete-room`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    const data = await res.json();

    if (!res.ok) {
      return;
    }
    removeRoom(id)
    if (openedRoom.id === id) {
      router.push("/dash/recent");
    }
  };

  return (
    <div className="border-b group border-gray-200 p-2 max-w-full w-full relative cursor-pointer hover:bg-gray-100">
      {openedRoom.id === id && (
        <div className="absolute left-0 top-1.5 h-12 w-1 bg-blue-500 rounded-r-md" />
      )}
      <div
        className="h-full absolute right-0 top-0 p-4 flex flex-row space-x-3 group-hover:bg-gray-100"
        onClick={deleteRoom}
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="copy"
          className="h-full opacity-0 group-hover:opacity-100"
          role="img"
          color="#777"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"
          ></path>
        </svg>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="trash"
          className="h-full opacity-0 group-hover:opacity-100"
          role="img"
          color="#777"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
          ></path>
        </svg>
      </div>
      <Link href={`/dash/${id}`} passHref>
        <div className="max-w-full">
          <h1 className="text-lg">{origin}</h1>
          <p className="text-xs text-gray-500 truncate">{link}</p>
        </div>
      </Link>
    </div>
  );
};

export default Room;
