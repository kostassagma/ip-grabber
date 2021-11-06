import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import DashNav from "../nav/dashNav";
import Footer from "../footer";
import MyRoomsTab from "./myRooms";
import RoomDetailsTab from "./roomDetails";
import { useScreenType } from "../../hooks/screenType";

const DashPage: NextPage = () => {
  const router = useRouter();
  const screenType = useScreenType();

  useEffect(() => {
    console.log(router.query);
    if (router.query.ca) {
      toast("Created Account");
    }
  }, [router]);

  if (screenType === "mobile") {
    return (
      <div>
        <div className="min-h-screen flex flex-col">
          <DashNav />
          <div className="p-5">
            <RoomDetailsTab />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <DashNav />
        <div className="p-5 grid grid-cols-2 gap-5 min-h-full">
          <MyRoomsTab />
          <RoomDetailsTab />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashPage;
