"use client";
import { signOut } from "next-auth/react";
import MatchButton from "./MatchButton";
import { BiLogOutCircle } from "react-icons/bi";

const Header = () => {
  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <div
      className="navbar bg-base-100 shadow-md"
      style={{
        width: "98%",
        margin: "10px auto",
      }}
    >
      <a className="btn btn-ghost text-xl">Lara Help</a>

      <MatchButton />

      <button onClick={handleSignOut} className="btn">
        <BiLogOutCircle />
      </button>
    </div>
  );
};

export default Header;
