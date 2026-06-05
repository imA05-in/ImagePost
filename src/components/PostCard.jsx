import { Link } from "react-router";
import appwriteService from "../appwrite/Config";
import { useState } from "react";

export default function PostCard({ post }) {
  const [file, setFile] = useState("");

  appwriteService
    .getfilePreview(post.ImageId)
    .then((img) => setFile(img))
    .catch((error) => console.log("PostCard :: getFilePreview: ", error));

  return (
    <Link to={`/post/${post.$id}`}>
      <div className="w-50 flex flex-col justify-center  gap-1 p-2 h-80 bg-purple-900/15 rounded-2xl border">
        <img src={file} alt=""  className="rounded max-h-50 "/>
        <h2 className="font-bold text-2xl">{post.title}</h2>
        <p className="text-gray-100">{`@${post.userName}`}</p>
      </div>
    </Link>
  );
}
