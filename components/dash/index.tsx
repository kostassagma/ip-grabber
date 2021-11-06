import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";
import DashNav from "../nav/dashNav";

const DashPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    console.log(router.query);
    if (router.query.ca) {
      toast("Created Account");
    }
  }, [router]);

  return (
    <div className="text-center">
      <DashNav/>
      <h1 className="font-bold text-7xl ">Ip Grabber</h1>
      <p className="mt-4">
        Get insight into hardware used to access your website
      </p>
      <Link href="/login" passHref>
        <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default DashPage;
