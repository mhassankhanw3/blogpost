import React from "react";
import { format, formatDistanceToNow } from "date-fns";
import Comments from "./comment";
import { BiLike } from "react-icons/bi";
import Link from "next/link";

const BlogCard = ({ _id, title, desc, username, profileImageUrl, onTime }) => {
  const date = new Date(onTime);

  const formattedDate = format(date, "dd MMM yyyy");
  const daysAgo = formatDistanceToNow(date, {
    addSuffix: true,
    includeSeconds: true,
  });

  return (
    <div className="bg-white blogCard transition-all rounded-lg overflow-hidden">
      <div className="flex items-center py-3 px-4 bg-gray-100">
        <img
          src={profileImageUrl}
          alt={`${username}'s Profile`}
          className="w-10 h-10 rounded-full object-cover mr-4"
        />
        <div className="max-w-[100%] w-[100%]">
          <h3 className="text-sm font-semibold">{username}</h3>
          <div className="text-gray-600 text-[13px] flex items-center justify-between max-w-[100%] w-[100%]">
            <div>{formattedDate}</div>{" "}
            <div className="ml-auto">
              Published at: {daysAgo.replace("about ", "")}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-4 px-10">
        <h3 className="font-bold text-gray-800 text-[20px]">{title}</h3>
        <p className="text-[15px] text-gray-500">{desc}</p>
      </div>
      <div className="mt-4 mb-2 px-8 flex items-center gap-2 ">
        <div className="p-3 hover:bg-zinc-200 transition-all rounded-full cursor-pointer">
          <BiLike className="text-gray-600 text-[20px] " />
        </div>
        <Link
          href={"/"}
          className="bg-green-50 hover:bg-green-100 transition-all text-green-600 px-2 py-2 rounded-md"
        >
          comment
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
