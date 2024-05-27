import React, { ReactNode } from "react";
import Header from "@/components/Header/header";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <div
        className="shadow-md"
        style={{
          width: "98%",
          height: "100%",
          margin: "20px auto",
          padding: "10px",
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
