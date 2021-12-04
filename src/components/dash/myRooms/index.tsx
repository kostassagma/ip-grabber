import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import NProgress from "nprogress";
import Room from "./room";
import { useRouter } from "next/router";
import { urlToPath } from "../../../lib/checkValidUrl";
import { API } from "../../../lib/constants";
import { authOnlyResHandler } from "../../../lib/clientSideRequest";
import { AuthContext } from "../../../modules/authProvider";

interface Rooms {
  link: string;
  id: string;
  origin: string;
}

const MyRoomsTab: NextPage = () => {
  const [myRooms, setMyRooms] = useState<Rooms[]>([]);
  const [newRoom, setNewRoom] = useState("");
  const [newRoomErr, setNewRoomErr] = useState("");
  const router = useRouter();
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    NProgress.start();
    authOnlyResHandler(`${API}/rooms/get-my-rooms`, accessToken)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setMyRooms(data);
        }
        NProgress.done();
      });
  }, []);

  const removeRoom = (id: string) => {
    let currentRooms = myRooms;
    let indexOfRoom = null;
    let count = 0;
    for (let i of currentRooms) {
      if (i.id == id) {
        indexOfRoom = count;
      }
      count++;
    }

    if (indexOfRoom === null) {
      return;
    }
    currentRooms.splice(indexOfRoom, 1);

    return setMyRooms([...currentRooms]);
  };

  const createNewRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newRoom) {
      return setNewRoomErr("Please enter a link");
    }
    const a = urlToPath(newRoom);
    if (!a) {
      return setNewRoomErr("Enter a valid link");
    }
    NProgress.start();
    const res = await authOnlyResHandler(
      `${API}/rooms/create-room`,
      accessToken,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: newRoom }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      NProgress.done();
      return console.warn(data);
    }
    let currentRooms = myRooms;
    currentRooms.push({
      id: data.id,
      link: newRoom,
      origin: a.hostname,
    });
    setMyRooms(currentRooms);
    setNewRoom("");
    router.push(`/dash/${data.id}`);
  };

  return (
    <div
      style={{ maxHeight: "inherit" }}
      className="rounded-md shadow-md p-5 w-full h-full flex flex-col"
    >
      <h1 className="text-3xl font-bold mb-1">My Rooms</h1>
      <div className="h-full overflow-y-scroll">
        {myRooms.map((e) => (
          <Room
            key={e.id}
            link={e.link}
            id={e.id}
            origin={e.origin}
            removeRoom={removeRoom}
          />
        ))}
      </div>
      <form
        className="rounded space-x-2 flex flex-row mt-3"
        onSubmit={createNewRoom}
      >
        <div className="flex-1">
          <input
            value={newRoom}
            className={`shadow appearance-none border ${
              newRoomErr ? "border-red-500" : ""
            } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
            id="link"
            type="text"
            placeholder="Link"
            onChange={(e) => {
              setNewRoom(e.target.value);
              setNewRoomErr("");
            }}
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
      <p className="text-red-500 text-xs italic">{newRoomErr}</p>
    </div>
  );
};

export default MyRoomsTab;
