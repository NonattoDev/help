import React, { ReactNode } from "react";
import Header from "@/components/Header/header";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <div
        className="shadow-md"
        style={{
          width: "95%",
          height: "100%",
          margin: "25px auto",
          padding: "30px",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
