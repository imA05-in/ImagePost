import { ID } from "appwrite";
import { Button, Input } from "./index";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import authService from "../appwrite/Auth";
import { useDispatch } from "react-redux";
import { toggleLoginRedux } from "../store/AuthSlice";
import { useState } from "react";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [err, setErr] = useState("");

  async function submit(data) {
    console.log("sb");

    try {
      await authService.createAccount({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      const userData = await authService.getAccount();
      if (userData) {
        dispatch(toggleLoginRedux(userData));
        navigate("/");
      }
    } catch (error) {
      setErr(error.message)
      console.log("/src/components/signup: ", error);
    }
  }

  return (
    <div className="border rounded p-2 m-2 w-full">
      {err && <p className="text-red-500" >{err}</p>}
      <form
        onSubmit={handleSubmit(submit)}
        className="flex gap-10 py-2 px-1 flex-col"
      >
        {errors.name && <p className="text-red-500">{errors.name.message}</p> }
        <Input
          label={`name`}
          {...register("name", {
            required: true,
            pattern: {
              value:/^[A-Za-z]+$/i,
              message: "Invalid name",
            },
          })}
        />

{errors.email && <p className="text-red-500 ">{errors.email.message}</p> }
        <Input label={`username`} {...register("email", { required: true,pattern:{
          value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          message: "Invalid email format"
        } })} />

        {errors.password && <p className="text-red-500" >{errors.password.message}</p> }
        <Input
          label={`password`}
          {...register("password", { required: true, minLength: {value:8,message: "password must be more than 8 digits"} })}
          />
        <Button />
      </form>
    </div>
  );
}
