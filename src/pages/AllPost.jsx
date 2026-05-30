//todo: add public/private tag to posts and show private posts(in AllPosts section) only to the author
import { Post } from "../components/index";
import appwriteService from "../appwrite/Config";
import { useEffect, useState } from "react";
import { PostCard } from "../components/index";

export default function AllPosts() {
  const [Posts, setPosts] = useState([]);

  useEffect(()=>{
      appwriteService
      .listRows()
      .then((posts) => (setPosts(posts.rows)))
      .catch((error) =>
        console.log("AllPosts :: appwriteService.listRows: ", error),
    );
},[])

  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center gap-4 py-2 flex-wrap">
      {Posts.length > 0
        ? Posts.map((post) => (
            <div key={post.title}>
              <PostCard post={post} />
            </div>
          ))
        : null}
    </div>
  );
}
