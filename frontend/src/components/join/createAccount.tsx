import { NextPage } from "next";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { ValidCodeContext } from ".";
import { passwordStrength } from "check-password-strength";
import { useRouter } from "next/router";
import { API } from "../../lib/constants";

const CreateAccount: NextPage = () => {
  const [invalidUsername, setInvalidUsername] = useState("");
  const [username, setUsername] = useState("");
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [strenght, setStrenght] = useState(passwordStrength(""));
  const { code } = useContext(ValidCodeContext);
  const router = useRouter();

  const enterCode = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInvalidPassword(false);
    if (!username) {
      return setInvalidUsername("Please submit a username");
    }
    if (!password) {
      return setInvalidPassword(true);
    }
    const currentStrenght = passwordStrength(password);
    if (currentStrenght.id !== 3) {
      return setInvalidPassword(true);
    }

    const res = await fetch(`${API}/auth/create-account`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, code }),
    });

    if (!res.ok) {
      return setInvalidUsername("Username Taken");
    }
    router.push("/dash?joined=true");
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={enterCode}
    >
      <h1 className="font-bold mb-4 text-2xl">Create Account</h1>
      <div className="mb-2">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Username
        </label>
        <input
          name="username"
          id="username"
          className={
            invalidUsername
              ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
              : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          }
          type="text"
          onChange={(e) => {
            setInvalidUsername("");
            setUsername(e.target.value);
          }}
          placeholder="JohnWick"
        />
        {invalidUsername ? (
          <p className="text-red-500 text-xs italic">{invalidUsername}</p>
        ) : (
          <></>
        )}
      </div>
      <div className="mb-2">
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Password
        </label>
        <input
          name="password"
          id="password"
          className={
            invalidPassword
              ? "shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline"
              : "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          }
          type="password"
          onChange={(e) => {
            setInvalidPassword(false);
            setPassword(e.target.value);
            setStrenght(passwordStrength(e.target.value));
          }}
          placeholder="******"
        />
        <div className="mt-2 w-full h-1 grid gap-1 grid-cols-4">
          <div
            className={`${
              password ? "bg-green-500" : "bg-red-500"
            } w-full h-full rounded-xl`}
          />
          <div
            className={`${
              strenght.id > 0 ? "bg-green-500" : "bg-red-500"
            } w-full h-full rounded-xl`}
          />
          <div
            className={`${
              strenght.id > 1 ? "bg-green-500" : "bg-red-500"
            } w-full h-full rounded-xl`}
          />
          <div
            className={`${
              strenght.id > 2 ? "bg-green-500" : "bg-red-500"
            } w-full h-full rounded-xl`}
          />
        </div>
        <p
          className={`${
            strenght.id === 3 ? "text-green-500" : "text-red-500"
          } text-xs italic`}
        >
          Your password is {strenght.value}
        </p>
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

export default CreateAccount;
