import { useNavigate, useParams } from "react-router";
import appwriteService from "../appwrite/Config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../components";
export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState("");
 const navigate = useNavigate()
  useEffect(() => {
    appwriteService
      .getRow(slug)
      .then((row) => (setPost(row), console.log(row)))
      .catch((error) => console.log("Post: ", error));
  }, []);

  const [file, setFile] = useState("");
  appwriteService
    .getfilePreview(post.ImageId)
    .then((img) => setFile(img))
    .catch((error) => console.log("PostCard :: getFilePreview: ", error));

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = userData.$id === post.userId ? true : false;

  async function delte() {
    appwriteService.deleteRow(post.$id).then(()=>navigate("/all-posts"))
  }

  async function update() {
    navigate(`/edit-post/${post.$id}`)
  }

  return (
    <div className="p-2 rounded">
      <img src={file} alt={post.title} className="rounded" />
      <div className="flex justify-between items-baseline">
        <div>
          <h2 className="font-bold text-2xl">{post.title}</h2>
          <p className="text-gray-100">{`@${post.userName}`}</p>
        </div>
        {isAuthor && <div className="flex gap-2">
            <Button label="edit" onclick={update}/>
            <Button label="delete" clssName={`bg-red-500`} type="" onclick={delte}/>
            </div>}
      </div>
    </div>
  );
}
