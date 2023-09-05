import React from "react";

const Footer = () => {
  return (
    <footer className="bg-green-900 text-white py-4 relative max-w-[100%] w-[100%] bottom-0 ">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Your Website Name. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
