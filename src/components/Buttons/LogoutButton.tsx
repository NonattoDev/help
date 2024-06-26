"use client";
import { signOut } from "next-auth/react";
import { BiLogOutCircle } from "react-icons/bi";

export function LogoutButton() {
  const handleSignOut = () => {
    signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };
  return (
    <button onClick={handleSignOut} className="btn">
      <BiLogOutCircle fontSize={18} />
    </button>
  );
}
