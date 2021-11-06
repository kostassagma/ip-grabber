import { NextPage } from "next";
import Link from "next/link";
import NProgress from "nprogress";
import React, { createContext, FC, useContext, useState } from "react";
import { ValidCodeContext } from ".";

const InviteCode: NextPage = () => {
  // const [code, setCode] = useState("");
  const [invalid, setInvalid] = useState(false);
  const { setValid, code, setCode } = useContext(ValidCodeContext);

  const enterCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(code);
    if (code.length !== 6) {
      setInvalid(true);
      return
    }
    NProgress.start()
    const res = await fetch(`/api/valid-code?code=${code}`);
    if (!res.ok) {
      setInvalid(true);
      setValid(false);
      return NProgress.done();
    }
    NProgress.done()
    setValid(true);
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={enterCode}
    >
      <h1 className="font-bold mb-4 text-2xl">Create Account</h1>
      <div className="mb-2">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Invitation Code
        </label>
        <input
          className={
            invalid
              ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
              : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          }
          type="text"
          onChange={(e) => {
            setInvalid(false);
            setCode(e.target.value);
          }}
          placeholder="6-digit code"
        />
        {invalid ? (
          <p className="text-red-500 text-xs italic">Invalid Code</p>
        ) : (
          <></>
        )}
      </div>
      <div className="mb-2">
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Join
        </button>
      </div>
      <p className="text-xs">
        Already have an account?{" "}
        <Link href="/login" passHref>
          <a className="inline-block font-bold text-blue-500 hover:text-blue-800">
            Login
          </a>
        </Link>
      </p>
    </form>
  );
};

export default InviteCode;
