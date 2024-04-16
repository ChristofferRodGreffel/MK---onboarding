import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <main className="content-grid mb-14 lg:w-3/4 lg:m-auto">{children}</main>
  );
};

export default PageWrapper;
