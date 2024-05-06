import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <main className="content-grid mb-14 max-w-screen-xl lg:w-4/5 lg:m-auto lg:mb-14">
      {children}
    </main>
  );
};

export default PageWrapper;
