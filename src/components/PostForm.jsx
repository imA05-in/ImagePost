import { Input, Button } from "./index";
import { useForm } from "react-hook-form";
import appwriteService from "../appwrite/Config";
import {} from "../store/AuthSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function PostForm({ post }) {
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: post?.title || "",
      // image: post?.image,
    },
  });
  const navigate = useNavigate();
  async function submit(data) {
    if (post) {
      try {
        console.log("data", data);
        console.log("post", { ...post });

        const file = await appwriteService.createFile(data.image[0]);
        console.log("file", file);
        if (file) {
          await appwriteService.deleteFile(post.ImageId);
          await appwriteService.updateRow({
            ImageId: file.$id,
            title: data.title,
            rowId: post.$id,
          });
          navigate(`/all-posts`);
        }
      } catch (error) {
        console.log("if (post): ", error);
      }
    } else {
      try {
        const file = await appwriteService.createFile(data.image[0]);

        if (file) {
          const row = await appwriteService.createRow({
            userId: userData.$id,
            userName: userData.name,
            ImageId: file.$id,
            title: data.title,
          });
          if (row) {
            navigate(`/post/${row.$id}`);
          }
        }
      } catch (error) {
        console.log("src/comopnents/PostForm :: submit: ", error);
      }
    }
  }

  return (
    <div className="flex justify-center items-center" >
      <form
        className="flex flex-col gap-10 border rounded justify-center items-center w-full p-2 m-4 py-6"
        onSubmit={handleSubmit(submit)}
      >
        <Input label={`title`} {...register("title", { required: true })} />
        <Input
          label={`image`}
          type="file"
          {...register("image", { required: true })}
        />
        <Button />
      </form>
    </div>
  );
}
