import type { NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <div className="w-full bg-gray-300 items-center p-4 grid grid-cols-1 sm:grid-cols-2 text-center space-y-5">
      <div>
        <h1 className="font-bold text-4xl">IP Grabber</h1>
      </div>
      <ul>
        <h2 className="text-2xl font-bold">Links</h2>
        <li>Github</li>
        <li>Terms & Conditions</li>
        <li>Login</li>
        <li>Register</li>
        <li>Report an issue</li>
      </ul>
    </div>
  );
};

export default Footer;
