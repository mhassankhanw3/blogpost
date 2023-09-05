"use client";
import React, { useState, useEffect } from "react";
import Layout from "../layout/page";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth, useUser } from "@clerk/nextjs";

export default function Page({
  _id,
  title: existingTitle,
  desc: existingDesc,
  userProfId: existingUserProfId,
  username: existingUsername,
  emailAddress: existingEmailAddress,
  profileImageUrl: existingProfileImageUrl,
}) {
  const [title, setTitle] = useState(existingTitle || "");
  const [desc, setDesc] = useState(existingDesc || "");
  const [userProfId, setUserProfId] = useState(existingUserProfId || ""); // User-related state variables
  const [username, setUsername] = useState(existingUsername || "");
  const [emailAddress, setEmailAddress] = useState(existingEmailAddress || "");
  const [profileImageUrl, setProfileImageUrl] = useState(
    existingProfileImageUrl || ""
  );
  const [userProfile, setUserProfile] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    setUserProfile(user);
    setUserProfId(user?.id);
    setUsername(user?.username);
    setEmailAddress(user?.emailAddresses?.[0]?.emailAddress);
    setProfileImageUrl(user?.profileImageUrl);
  }, [user]);

  const saveBlog = async (e) => {
    e.preventDefault();

    setLoading(true);

    const data = {
      title: title?.trim(),
      desc: desc?.trim(),
      userProfId: user?.id,
      username: user?.username,
      emailAddress: user?.emailAddresses?.[0]?.emailAddress,
      profileImageUrl: user?.profileImageUrl,
    };

    try {
      const savePromise = _id
        ? axios.put("/api/blog", { ...data, _id })
        : axios.post("/api/blog", data);

      const response = await savePromise;

      console.log(response, "react-hot-toast-promise");

      setTitle(""); // Clear input fields
      setDesc("");

      // Display success toast
      toast.success("Blog Published successfully!", {
        position: "top-center",
        duration: 4000,
      });
      router.push("/explore");
      // Handle success actions if needed
    } catch (error) {
      console.error(error, "react-hot-toast-promise error");

      // Display error toast
      toast.error("Failed to save blog.", {
        position: "top-center",
        duration: 4000,
      });

      // Handle error if necessary
    } finally {
      setLoading(false); // Reset loading state to false
    }
  };

  const isPublishButtonDisabled = title.trim() === "" || desc.trim() === "";
  const handleCancel = () => {
    router.back();
  };
  return (
    <Layout>
      <div className="container mt-20 mx-auto px-4 py-8 max-w-[82%]">
        <h1 className="text-3xl font-extrabold mb-4">Create a New Blog</h1>
        <form onSubmit={saveBlog} className="max-w-[100%]">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="mt-1 p-2 border rounded w-full transition-all focus:border-green-600 outline-none text-gray-700 placeholder-gray-400"
              placeholder="Enter your blog title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Content
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="mt-1 p-2 border rounded w-full h-40 focus:border-green-600 outline-none"
              placeholder="Write your blog content"
            ></textarea>
          </div>
          <div className="flex text-center justify-end mt-8">
            <button
              className={`bg-red-200 hover:bg-red-300 transition-all text-red-800 px-4 py-2 rounded mr-4 ${
                loading ? "cursor-not-allowed" : ""
              }`}
              type="button"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
                loading || isPublishButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              type="submit"
              disabled={loading || isPublishButtonDisabled}
            >
              {loading ? (
                <span className="custom-loading-button opacity-50">
                  <span className="loader"></span> Loading
                </span>
              ) : (
                "Publish"
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
