"use client";
import React, { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import Footer from "../component/Footer";

export default function Page({ children }) {
  return (
    <>
      <div className="max-w-[100%] mx-auto w-[80%] ">
        <main className="flex flex-col">
          <header className="bg-white">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
              <strong className="font-extrabold text-green-700 sm:block linkHover transition-all relative">
                <a href="/">#BlogPost</a>
              </strong>

              <div className="flex flex-1 items-center justify-end md:justify-between">
                <nav aria-label="Global" className="hidden md:block">
                  <ul className="flex items-center gap-6 text-sm">
                    <li>
                      <Link
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="/"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="/explore"
                      >
                        Explore
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-gray-500 transition hover:text-gray-500/75"
                        href="/contact"
                      >
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="flex items-center gap-4">
                  {/* You can replace 'UserButton' with appropriate user authentication components */}
                  <UserButton afterSignOutUrl="/" />
                </div>
              </div>
            </div>
          </header>
        </main>
        <Toaster />
        {children}
      </div>
      {/* <Footer /> */}
    </>
  );
}
