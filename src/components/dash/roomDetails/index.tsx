import type { NextPage } from "next";
import Link from "next/link";
import DashNav from "../../nav/dashNav";
import Footer from "../../footer";
import { useContext, useEffect, useState } from "react";
import { OpenRoomContext } from "..";

interface Visitors {
  ip: string;
  time: string;
}

interface Room {
  link: string;
  id: string;
  visitors: Visitors[];
}

const RoomDetailsTab: NextPage = () => {
  const [roomDetails, setRoomDetails] = useState<Room>({
    link: "",
    id: "",
    visitors: [],
  });
  const { id } = useContext(OpenRoomContext);

  useEffect(() => {
    fetch(`/api/get-room-details?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRoomDetails(data);
        console.log(data);
      });
  }, [id]);

  return (
    <div className="rounded-md shadow-md p-5 w-full">
      <h1 className="text-3xl font-bold">{roomDetails.link}</h1>
      {/* <h2>Visitors:</h2> */}
      <table className="table-auto w-full mt-2">
        <thead>
          <tr>
            <th className="w-1/3">Time</th>
            <th className="w-1/3">Ip</th>
            <th className="w-1/3">More Dets</th>
          </tr>
        </thead>
        <tbody>
          {roomDetails.visitors.map((visitor) => (
            <tr>
              <td className="w-1/3 text-center">{visitor.time}</td>
              <td className="w-1/3 text-center">{visitor.ip}</td>
              <td className="w-1/3 text-center">...</td>
            </tr>
          ))}
          {/* <tr>
            <td className="w-1/3 text-center">22:00</td>
            <td className="w-1/3 text-center">123.233.12.34</td>
            <td className="w-1/3 text-center">...</td>
          </tr>
          <tr>
            <td className="w-1/3 text-center">22:00</td>
            <td className="w-1/3 text-center">123.233.12.34</td>
            <td className="w-1/3 text-center">...</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default RoomDetailsTab;