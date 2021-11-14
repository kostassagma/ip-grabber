import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import DashNav from "../nav/dashNav";
import Footer from "../footer";
import MyRoomsTab from "./myRooms";
import RoomDetailsTab from "./roomDetails";
import { useScreenType } from "../../hooks/screenType";

interface OpenRoom {
  id: string;
}

export const OpenRoomContext = createContext({} as OpenRoom)

const DashPage: NextPage = () => {
  const router = useRouter();
  const screenType = useScreenType();
  const [roomOpened, setRoomOpened] = useState("")

  useEffect(() => {
    const {room} = router.query
    // if (router.query.ca) {
    //   toast("Created Account");
    // }
    if (room) {
      setRoomOpened(typeof(room)=="string"?room:room[0])
    }
  }, [router]);

  return (
    <OpenRoomContext.Provider value={{id:roomOpened}}>
      <div className="h-screen flex flex-col">
        <DashNav />
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-5 h-full">
          {screenType === "mobile" && (
            <Link href="/dash" passHref>
              <a className="inline-block font-bold text-blue-500 hover:text-blue-800">
                {"←"} Back to my rooms
              </a>
            </Link>
          )}
          {screenType==="desktop"&&<MyRoomsTab />}
          <RoomDetailsTab />
        </div>
      </div>
      <Footer />
    </OpenRoomContext.Provider>
  );
};

export default DashPage;
