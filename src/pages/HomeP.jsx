import { useDispatch } from "react-redux";
import authService from "../appwrite/Auth";
import appwriteService from "../appwrite/Config";
import { Button, PostCard } from "../components";
import { useEffect, useState } from "react";
import { toggleLoginRedux } from "../store/AuthSlice";

export default function HomeP() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();


  useEffect(()=>{
    try {
      appwriteService.listRows().then((rows)=>setPosts(rows.rows)).catch((err)=>console.log("listRows: ",err))
    } catch (error) {
      console.log(("HomeP :: listRows: ",error));
      
    }
  },[])

  // useEffect(() => {
  //   async function initializeHome() {
  //     try {
  //       const userData = await authService.getAccount()
  //       if(userData){
  //         dispatch(toggleLoginRedux(userData))
  //         console.log(userData);
          
  //       }

  //     } catch (error) {
  //       console.error("Error initializing Home page:", error);
  //     } 
  //   }

  //   initializeHome();
  // }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row md:justify-center items-center gap-4 py-2 flex-wrap">
      {posts.map((post) => (
        <div key={post.$id || post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}