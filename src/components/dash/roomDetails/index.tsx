import type { NextPage } from "next";
import Link from "next/link";
import DashNav from "../../nav/dashNav";
import Footer from "../../footer";

const RoomDetailsTab: NextPage = () => {
  return (
    <div className="rounded-md shadow-md p-5 w-full">
      <h1 className="text-3xl font-bold">https://skroutz.gr</h1>
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
          <tr>
            <td className="w-1/3 text-center">22:00</td>
            <td className="w-1/3 text-center">123.233.12.34</td>
            <td className="w-1/3 text-center">...</td>
          </tr>
          <tr>
            <td className="w-1/3 text-center">22:00</td>
            <td className="w-1/3 text-center">123.233.12.34</td>
            <td className="w-1/3 text-center">...</td>
          </tr>
          <tr>
            <td className="w-1/3 text-center">22:00</td>
            <td className="w-1/3 text-center">123.233.12.34</td>
            <td className="w-1/3 text-center">...</td>
          </tr> 
        </tbody>
      </table>
    </div>
  );
};

export default RoomDetailsTab;
