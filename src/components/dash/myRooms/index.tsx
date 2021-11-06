import type { NextPage } from "next";
import Link from "next/link";
import DashNav from "../../nav/dashNav";
import Footer from "../../footer";
import { useEffect, useState } from "react";
import NProgress from "nprogress";
import Room from "./room";
import { useRouter } from "next/router";

interface Rooms {
  link: string;
  id: string;
}

const MyRoomsTab: NextPage = () => {
  const [myRooms, setMyRooms] = useState<Rooms[]>([]);
  const [newRoom, setNewRoom] = useState("");
  const router = useRouter();

  useEffect(() => {
    NProgress.start();
    fetch("/api/get-my-rooms")
      .then((res) => res.json())
      .then((data) => {
        setMyRooms(data);
        NProgress.done();
      });
  }, []);

  console.log(myRooms);

  const createNewRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newRoom) {
      return console.warn("please input a link");
    }
    NProgress.start();
    const res = await fetch("/api/create-room", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link: newRoom }),
    });
    const data = await res.json();
    if (!res.ok) {
      NProgress.done()
      return console.warn(data);
    }
    let currentRooms = myRooms
    currentRooms.push({
      id: data.id,
      link: newRoom
    })
    setMyRooms(currentRooms)
    router.push(`/dash/${data.id}`);
  };

  return (
    <div className="rounded-md shadow-md p-5 w-full min-h-full flex flex-col">
      <h1 className="text-3xl font-bold">My Rooms</h1>
      {myRooms.map((e) => (
        <Room key={e.id} link={e.link} id={e.id} />
      ))}
      <form
        className="rounded space-x-2 flex flex-row mt-3"
        onSubmit={createNewRoom}
      >
        <div className="flex-1">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="link"
            type="text"
            placeholder="Link"
            onChange={(e) => setNewRoom(e.target.value)}
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
