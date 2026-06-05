import { useDispatch } from "react-redux";
import authService from "../appwrite/Auth";
import appwriteService from "../appwrite/Config";
import { Button, PostCard } from "../components";
import { useEffect, useState } from "react";
import { toggleLoginRedux } from "../store/AuthSlice";
export default function HomeP() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      
      appwriteService
      .listRows()
      .then((post) => setPosts(post.rows))
      .catch((error) => console.log("Homep: ", error));
    } catch (error) {
      console.log("Home :: listRows: ",error);
      
    }
  }, []);

  useEffect(() => {
    try {
      async function authStat() {
        const userData = await authService.getAccount();
        if (userData) {
          dispatch(toggleLoginRedux(userData));
          // console.log(userData);
        }
      }
      authStat();
    } catch (error) {
      console.log("authStat: ", error);
    }
  }, []);

  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center gap-4 py-2 flex-wrap">
      {posts.map((post) => (
        <div key={post.title}>
          <PostCard post={post} />
        </div>
      ))}
      <div></div>
    </div>
  );
}
