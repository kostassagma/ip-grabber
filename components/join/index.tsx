import { NextPage } from "next";
import React, { createContext, useState } from "react";
import CreateAccount from "./createAccount";
import InviteCode from "./enterCode";

interface validCode {
  setValid: React.Dispatch<React.SetStateAction<boolean>>;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
}

export const ValidCodeContext = createContext({} as validCode);

const JoinPage: NextPage = () => {
  const [code, setCode] = useState("");
  const [valid, setValid] = useState(false);

  return (
    <div className="h-screen flex">
      <div className="m-auto w-full max-w-xs">
        <ValidCodeContext.Provider value={{ setValid, code, setCode }}>
          {valid ? <CreateAccount /> : <InviteCode />}
        </ValidCodeContext.Provider>
        <p className="text-center text-gray-500 text-xs">
          &copy;2021 Acme Corp. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default JoinPage;
