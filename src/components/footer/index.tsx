import type { NextPage } from "next";
import Link from "next/link";

const Footer: NextPage = () => {
  return (
    <div className="w-full bg-gray-300 items-center p-4 grid grid-cols-1 sm:grid-cols-2 text-center space-y-5">
      <div>
        <h1 className="font-bold text-4xl">IP Grabber</h1>
      </div>
      <ul>
        <h2 className="text-2xl font-bold">Links</h2>
        <li>
          <Link href="https://github.com/kostassagma/ip-grabber/" passHref>
            <a target="_blank">Github</a>
          </Link>
        </li>
        <li>
          <Link href="/terms.html" passHref>
            <a target="_blank">Terms & Conditions</a>
          </Link>
        </li>
        <li>
          <Link href="/login" passHref>
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/login/join" passHref>
            <a>Register</a>
          </Link>
        </li>
        <li>
          <Link href="https://github.com/kostassagma/ip-grabber/issues/new" passHref>
            <a target="_blank">Report an issue</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
