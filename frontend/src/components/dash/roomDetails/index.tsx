import type { NextPage } from "next";
import { useContext, useEffect, useState } from "react";
import { OpenRoomContext } from "..";
import { authOnlyResHandler } from "../../../lib/clientSideRequest";
import { API } from "../../../lib/constants";
import { AuthContext } from "../../../modules/authProvider";

interface Visitors {
  ip: string;
  time: string;
}

interface Room {
  link: string;
  id: string;
  origin: string;
  visitors: Visitors[];
}

const RoomDetailsTab: NextPage = () => {
  const [roomDetails, setRoomDetails] = useState<Room>({
    link: "",
    id: "",
    origin: "",
    visitors: [],
  });
  const { id } = useContext(OpenRoomContext);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const res = await authOnlyResHandler(
        `${API}/rooms/get-room-details?id=${id}`,
        accessToken
      );

      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setRoomDetails(data);
    })();
  }, [id]);

  return (
    <div className="rounded-md shadow-md p-5 h-full w-full">
      <h1 className="text-3xl font-bold">{roomDetails.origin}</h1>
      <p>{roomDetails.link}</p>
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
          {roomDetails.visitors?.map((visitor, i) => (
            <tr key={i}>
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
