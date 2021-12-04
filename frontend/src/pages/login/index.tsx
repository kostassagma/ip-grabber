import React, { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import { API } from "../../lib/constants";
import { AuthContext } from "../../modules/authProvider";

const Login: NextPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const { setAccessToken } = useContext(AuthContext);
  const [rememberMe, setRememberMe] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.query.next !== undefined) {
      localStorage.setItem(
        "nextUrl",
        typeof router.query.next === "string"
          ? router.query.next
          : router.query.next[0]
      );
    }
  }, [router]);

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username) {
      return setUsernameErr("Please enter a username");
    }
    if (!password) {
      return setPasswordErr("Please enter a password");
    }
    NProgress.start();
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, rememberMe }),
    });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 404) {
        setUsernameErr(data.Err);
      } else if (res.status === 401) {
        setPasswordErr(data.Err);
      }
      NProgress.done();
      return;
    }
    setAccessToken(data.accessToken!);
    NProgress.done();
    const nextUrl = localStorage.getItem("nextUrl")
    sessionStorage.setItem("toast", "Logged In")
    router.push(nextUrl?nextUrl:"/dash");
  };

  return (
    <>
      <Head>
        <title>Ip Grabber | Login</title>
      </Head>
      <div className="bg-white dark:bg-gray-900 h-screen flex">
        <div className="m-auto w-full max-w-xs">
          <form
            className="bg-white dark:bg-black shadow-md rounded px-8 pt-6 pb-6 mb-4"
            onSubmit={submitForm}
          >
            <h1 className="font-bold mb-3 text-4xl">Login</h1>
            {/* Username */}
            <div className="mb-2">
              <label className="block text-gray-700 text-sm font-bold mb-0">
                Username
              </label>
              <input
                onChange={(e) => {
                  setUsernameErr("");
                  setUsername(e.target.value);
                }}
                className={`shadow appearance-none border ${
                  usernameErr ? "border-red-500" : ""
                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id="username"
                type="text"
                placeholder="Username"
              />
              {usernameErr && (
                <p className="text-red-500 text-xs italic">{usernameErr}</p>
              )}
            </div>
            {/* Password */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-bold mb-0">
                Password
              </label>
              <input
                onChange={(e) => {
                  setPasswordErr("");
                  setPassword(e.target.value);
                }}
                className={`shadow appearance-none border ${
                  passwordErr ? "border-red-500" : ""
                } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id="password"
                type="password"
                placeholder="******************"
              />
              {passwordErr && (
                <p className="text-red-500 text-xs italic">{passwordErr}</p>
              )}
            </div>
            <div className="mb-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={rememberMe}
                  onChange={(e) => {
                    setRememberMe(!rememberMe);
                  }}
                />
                <span className="ml-2 text-xs">Remember me</span>
              </label>
            </div>
            {/* Submit */}
            <div className="flex items-center justify-between mb-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <Link href="/" passHref>
                <a className="font-bold text-blue-500 hover:text-blue-800 inline-block">
                  Cancel
                </a>
              </Link>
            </div>
            <p className="text-xs">
              Don{"'"}t already have an account?{" "}
              <Link href="/login/join" passHref>
                <a className="inline-block font-bold text-blue-500 hover:text-blue-800">
                  Create One
                </a>
              </Link>
            </p>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2020 Acme Corp. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
