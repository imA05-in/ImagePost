import { ID } from "appwrite";
import { Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import authService from "../appwrite/Auth";
import { useDispatch } from "react-redux";
import { toggleLoginRedux } from "../store/AuthSlice";

export default function Signup() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function submit(data) {
    try {
      await authService.createAccount({
        email: data.email,
        password: data.password,
        name: data.name,
      })
      const userData = await authService.getAccount()
      if (userData) {
        dispatch(toggleLoginRedux(userData));
        navigate("/");
      }
    } catch (error) {
        console.log("/src/components/signup: ",error);
        
    }
  }

  return (
    <div className="border rounded p-2 m-2 w-full">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex gap-10 py-2 px-1 flex-col"
      >
        <Input
          label={`name`}
          {...register("name", { required: true, pattern: /^[A-Za-z]+$/i })}
        />

        <Input
          label={`username`}
          {...register("email", { required: true })}
        />

        <Input
          label={`password`}
          {...register("password", { required: true, minLength: 8 })}
        />
        <Button/>
      </form>
    </div>
  );
}
