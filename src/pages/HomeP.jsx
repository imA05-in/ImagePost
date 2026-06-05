import { useDispatch } from "react-redux";
import authService from "../appwrite/Auth";
import appwriteService from "../appwrite/Config";
import { Button, PostCard } from "../components";
import { useEffect, useState } from "react";
import { toggleLoginRedux } from "../store/AuthSlice";

export default function HomeP() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Added a loading state
  const dispatch = useDispatch();

  useEffect(() => {
    // 1. Define a single, unified async function
    async function initializeHome() {
      try {
        // Fetch posts and auth status in parallel to save time
        const [postsData, userData] = await Promise.all([
          appwriteService.listRows(),
          authService.getAccount().catch(() => null) // Prevent auth failure from crashing the post fetch
        ]);

        // Handle posts data
        if (postsData?.rows) {
          setPosts(postsData.rows);
        }

        // Handle auth data
        if (userData) {
          dispatch(toggleLoginRedux(userData));
        }
      } catch (error) {
        console.error("Error initializing Home page:", error);
      } finally {
        setLoading(false);
      }
    }

    initializeHome();
  }, [dispatch]); // Added dispatch to dependency array (best practice)

  if (loading) {
    return <div className="text-center py-10">Loading posts...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-10">No posts found.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center gap-4 py-2 flex-wrap">
      {posts.map((post) => (
        // Using $id (Appwrite default) or id instead of title for the key
        <div key={post.$id || post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}