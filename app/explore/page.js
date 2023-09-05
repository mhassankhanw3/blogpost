"use client";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Page from "../layout/page";
import axios from "axios";
import BlogCard from "@/app/component/BlogCard";
import { Spin } from "antd";
import { useRouter } from "next/navigation";

export default function Explore() {
  const [userProfile, setUserProfile] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    setUserProfile(user);
    setLoading(true);

    axios
      .get("/api/blog")
      .then((response) => {
        // Sort blogs based on createdAt in reverse order (most recent first)
        console.log(response.data, "blog response");
        const sortedBlogs = response.data.sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
        setBlogs(sortedBlogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, [user]);

  return (
    <Page>
      <div className="mt-20 max-w-[100%] sm:w-[80%] w-[100%] mx-auto ">
        <h2 className="text-3xl font-extrabold text-green-700 sm:text-5xl">
          Welcome to the Exploration,
          <br />
          <span className="text-black">{userProfile?.username}!</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Explore a world of insightful blogs and stories from creators like
          you. Get ready to discover new perspectives and share your thoughts
          with the community.
        </p>
        <div className="mt-8">
          <Link href="/submit" legacyBehavior>
            <a className="block w-full rounded bg-green-600 text-center px-6 py-3 text-sm font-medium text-white shadow hover:bg-green-700 focus:outline-none focus:ring active:bg-green-500 sm:w-auto transition-all">
              Start Writing
            </a>
          </Link>
        </div>
        <div className="my-12">
          <h3 className="text-xl font-semibold">Recent Blogs:</h3>
          {loading && <Spin size="large" className="mx-auto w-[100%] mt-10 " />}
          <ul className="mt-4 space-y-4">
            {blogs.map((blog) => (
              <li key={blog._id}>
                <BlogCard
                  _id={blog.id}
                  title={blog.title}
                  desc={blog.desc}
                  username={blog.username}
                  profileImageUrl={blog.profileImageUrl}
                  onTime={blog.createdAt}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Page>
  );
}
