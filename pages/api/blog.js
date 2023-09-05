import { Blog } from "../../models/blog";
import { mongooseConnect } from "../../lib/mongoose";
import { useEffect } from "react";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Blog.findOne({ _id: req.query.id }));
    } else {
      // Return all blogs when no query parameter is provided
      const blogs = await Blog.find();
      res.json(blogs);
    }
  }

  if (method === "POST") {
    const { title, desc, userProfId, username, emailAddress, profileImageUrl } =
      req.body;
    const BlogDoc = await Blog.create({
      title,
      desc,
      userProfId,
      username,
      emailAddress,
      profileImageUrl,
    });
    res.json(BlogDoc);
  }
  if (method === "PUT") {
    const {
      title,
      desc,
      userProfId,
      username,
      emailAddress,
      profileImageUrl,
      _id,
    } = req.body;
    await Blog.updateOne(
      { _id },
      { title, desc, userProfId, username, emailAddress, profileImageUrl }
    );
    res.json(true);
  }
  if (method === "DELETE") {
    if (req.query?.id) {
      await Blog.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
